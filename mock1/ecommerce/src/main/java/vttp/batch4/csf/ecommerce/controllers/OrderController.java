package vttp.batch4.csf.ecommerce.controllers;


import java.io.ByteArrayInputStream;
import java.io.InputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import vttp.batch4.csf.ecommerce.Utils;
import vttp.batch4.csf.ecommerce.models.Order;
import vttp.batch4.csf.ecommerce.services.PurchaseOrderService;

@Controller
@RequestMapping("/api")
public class OrderController {

  @Autowired
  private PurchaseOrderService poSvc;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked

  @PostMapping(path="/order",produces = MediaType.APPLICATION_JSON_VALUE  ,
  consumes=MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<String> postOrder(@RequestBody String orderJsonString) {

    // TODO Task 3

      InputStream is = new ByteArrayInputStream(orderJsonString.getBytes());
      JsonReader reader = Json.createReader(is);
      JsonObject orderJson = reader.readObject();

      Order order = Utils.jsonToPojo(orderJson);
      poSvc.createNewPurchaseOrder(order) ;
      
      JsonObject response = Json.createObjectBuilder()
        .add("orderId",order.getOrderId())
        .build();
      
	
	 return ResponseEntity.status(200).body(response.toString());
  }

 
}
