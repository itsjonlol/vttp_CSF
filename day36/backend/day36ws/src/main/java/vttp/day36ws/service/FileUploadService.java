package vttp.day36ws.service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import vttp.day36ws.models.Post;
import vttp.day36ws.repo.FileUploadRepo;

@Service
public class FileUploadService {
    
    @Autowired
    private FileUploadRepo fileUploadRepo;

    public String uploadFile(MultipartFile file, String comments) throws SQLException,IOException{
        return fileUploadRepo.upload(file, comments);
    }

    public Optional<Post> getPostById(String postId) throws SQLException{
        return fileUploadRepo.getPostById(postId);

    }
}
