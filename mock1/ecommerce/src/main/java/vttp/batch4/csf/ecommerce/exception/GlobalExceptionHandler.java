package vttp.batch4.csf.ecommerce.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import vttp.batch4.csf.ecommerce.exception.exceptions.ErrorMessage;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class) 
    public ResponseEntity<ErrorMessage> handleException(Exception ex,
    HttpServletRequest request, HttpServletResponse response) {
        ErrorMessage errorMessage = new ErrorMessage(
        ex.getMessage());

        return new ResponseEntity<>(errorMessage,HttpStatus.BAD_REQUEST);

    }
}

//     @ExceptionHandler(BookingErrorException.class) 
//     public ResponseEntity<ErrorMessage> handleExceptions(Exception ex,
//     HttpServletRequest request) {
//         HttpStatus status;
//         if (ex instanceof BookingErrorException) {
//             status = HttpStatus.BAD_REQUEST;
//         } else {
//             status = HttpStatus.INTERNAL_SERVER_ERROR; 
//         }
//         ErrorMessage errorMessage = new ErrorMessage(status.value(),
//         ex.getMessage(),new Date(), request.getRequestURI());

//         return new ResponseEntity<>(errorMessage,status);

//     }
// }