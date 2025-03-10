package vttp.batch4.csf.ecommerce.repositories;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import vttp.batch4.csf.ecommerce.exception.exceptions.BookingErrorException;
import vttp.batch4.csf.ecommerce.models.LineItem;
import vttp.batch4.csf.ecommerce.models.Order;

@Repository
public class PurchaseOrderRepository {

  @Autowired
  private JdbcTemplate template;


  private static final String SQL_INSERT_ORDER = """
      insert into orders values (?,?,?,?,?,?);
      """;

  private static final String SQL_INSERT_LINEITEMS = """
      insert into cart values (?,?,?,?,?)
      """;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  // You may only add Exception to the method's signature


  // private final String orderId;
  // private Date date = new Date();
  // private String name;
  // private String address;
  // private boolean priority;
  // private String comments;
  // private Cart cart = new Cart();

  // private String productId;
  // private String name;
  // private int quantity;
  // private float price;
  public void create(Order order) {
    // TODO Task 3

      int iUpdated = template.update(SQL_INSERT_ORDER,order.getOrderId(),order.getDate(),order.getName(),order.getAddress(),
        order.getPriority(),order.getComments());
      if (iUpdated<=0) {
			  throw new BookingErrorException("failed to update");
		}

      // template.batchUpdate(sql)
      List<LineItem> lis = order.getCart().getLineItems();

      List<Object[]> params = lis.stream()
            .map(li -> {
                Object[] rec = new Object[5];
                rec[0] = li.getProductId();
                rec[1] = li.getName();
                rec[2] = li.getQuantity();
                rec[3] = li.getPrice();
                rec[4] = order.getOrderId();
                return rec;
            }).toList();
      int[] iUpdated2 = template.batchUpdate(SQL_INSERT_LINEITEMS,params);

      if (Arrays.stream(iUpdated2).allMatch(updatedRows -> updatedRows <= 0)) {
        throw new BookingErrorException("failed to update");
      }
  }

  
}
