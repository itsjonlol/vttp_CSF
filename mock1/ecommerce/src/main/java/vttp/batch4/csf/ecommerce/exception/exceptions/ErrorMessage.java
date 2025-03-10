package vttp.batch4.csf.ecommerce.exception.exceptions;

public class ErrorMessage {
    

    
    private String message;
   
    
    public ErrorMessage() {

    }

    public ErrorMessage(String message) {
       
        this.message = message;
     
    }



    
    // this returns the "message" attribute
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    

    


}
