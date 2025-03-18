package vttp.day36ws.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;

@Service
public class S3Service {
    @Autowired
    private AmazonS3 amazonS3;

    @Value("${do.storage.bucket}")
    private String bucketName;

    @Value("${do.storage.endpoint}")
    private String endPoint;

    public String upload(MultipartFile file, 
        String comments, 
        String postId) throws IOException{
        Map<String, String> metadata = Map.of(
            "comments", comments,
            "postId", postId,
            "uploadDatetime", String.valueOf(System.currentTimeMillis())
        );

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(file.getContentType());
        objectMetadata.setContentLength(file.getSize());
        objectMetadata.setUserMetadata(metadata);
        String origFilename = file.getOriginalFilename();
        String finalFilename = "";
      
            finalFilename = postId + ".png";
        

        PutObjectRequest putObjectRequest = new PutObjectRequest(
            bucketName, finalFilename, file.getInputStream(), objectMetadata);
        putObjectRequest.withCannedAcl(CannedAccessControlList.PublicRead);
        amazonS3.putObject(putObjectRequest);
        System.out.println("https://%s.%s/%s"
                    .formatted(bucketName, endPoint, finalFilename));
        return "https://%s.%s/%s"
                    .formatted(bucketName, endPoint, finalFilename);
    }


    public ResponseEntity<byte[]> downloadFile(String bucketName, String key) {
        try {
            GetObjectRequest getReq = new GetObjectRequest(bucketName, key);
            S3Object result = amazonS3.getObject(getReq);

            ObjectMetadata metadata = result.getObjectMetadata();
            Map<String, String> userData = metadata.getUserMetadata();

            try (var is = result.getObjectContent()) {
                byte[] buffer = is.readAllBytes();
                
                return ResponseEntity.status(HttpStatus.OK)
                        .contentLength(result.getObjectMetadata().getContentLength())
                        .contentType(MediaType.parseMediaType(result.getObjectMetadata().getContentType()))
                        .header("X-name", userData.getOrDefault("name", "unknown"))
                        .body(buffer);
            }
        } catch (AmazonS3Exception ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(("File not found: " + key).getBytes());
        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error reading file".getBytes());
        }
    }
}
