package vttp.day36ws.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import vttp.day36ws.models.Post;
import vttp.day36ws.service.FileUploadService;
import vttp.day36ws.service.S3Service;


@RestController
@RequestMapping("/api")
public class FileUploadController {
    private static final String BASE64_PREFIX = "data:image/png;base64,";
    
    @Autowired
    FileUploadService fileUploadService;

    @Autowired
    S3Service s3Service;

    @PostMapping(path="/upload",consumes=MediaType.MULTIPART_FORM_DATA_VALUE,
    produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> upload(@RequestPart("file") MultipartFile file, @RequestPart("comments") String comments) {
        
        String postId;

        try{
            postId = fileUploadService.uploadFile(file, comments);
            System.out.println("Post ID: " + postId);
            if(postId != null && !postId.isEmpty()){
                System.out.println("Post ID: " + postId);
                String s3EndpointUrl = this
                                    .s3Service.upload(file, comments, postId);
                System.out.println(s3EndpointUrl);
            }
        }catch(SQLException | IOException e){
            return ResponseEntity
                        .badRequest().body(e.getMessage());
        }
        Map<String,Object> response = new HashMap<>();
        response.put("postId",postId);

        // JsonObject responseObject = Json.createObjectBuilder()
        //     .add("postId",postId)
        //     .build();

        return ResponseEntity.ok(response);
       
    }

    @PostMapping(path="/upload2",consumes=MediaType.MULTIPART_FORM_DATA_VALUE,
    produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> upload2(@RequestPart("file") MultipartFile file, @RequestPart("comments") String comments) {
        
        String postId;
        System.out.println(comments);
        try{
            postId = fileUploadService.uploadFile(file, comments);
            System.out.println("Post ID: " + postId);
            if(postId != null && !postId.isEmpty()){
                System.out.println("Post ID: " + postId);
                String s3EndpointUrl = this
                                    .s3Service.upload(file, comments, postId);
                System.out.println(s3EndpointUrl);
            }
        }catch(SQLException | IOException e){
            return ResponseEntity
                        .badRequest().body(e.getMessage());
        }
        Map<String,Object> response = new HashMap<>();
        response.put("postId",postId);

        // JsonObject responseObject = Json.createObjectBuilder()
        //     .add("postId",postId)
        //     .build();

        return ResponseEntity.ok(response);
       
    }



    @GetMapping(path="/posts/{postId}")
    public ResponseEntity<?> getPostById(@PathVariable("postId") String postId) throws SQLException {
        Optional<Post> opt = fileUploadService.getPostById(postId);
        
        Post post = opt.get();

        Map<String,Object> response = new HashMap<>();

        if (opt.isEmpty()) {
            response.put("message","Image of "+ postId + " not found.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        
    

        String encodedString = Base64.getEncoder()
            .encodeToString(post.getImage());
        response.put("image",BASE64_PREFIX + encodedString);
        response.put("comments",post.getComments());
        return ResponseEntity.ok(response);

    }
    @GetMapping("/{bucket}/{fileName}")
    public ResponseEntity<byte[]> getFile(@PathVariable String bucket, @PathVariable String fileName) {
        return s3Service.downloadFile(bucket, fileName);
    }
    
}
