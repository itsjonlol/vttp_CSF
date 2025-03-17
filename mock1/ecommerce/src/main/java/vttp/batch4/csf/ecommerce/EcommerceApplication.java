package vttp.batch4.csf.ecommerce;

import java.io.BufferedReader;
import java.io.FileReader;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EcommerceApplication implements CommandLineRunner{

  @Value("${datafile}")
  private String dataFile;
  public static void main(String[] args) {
    SpringApplication.run(EcommerceApplication.class, args);
  }

  @Override
  public void run(String... args) throws Exception {
    try (BufferedReader br = new BufferedReader(new FileReader(dataFile))) {
      String line;
      while ((line = br.readLine()) != null) {
       
        System.out.println(line);
    }
  }

}
}
