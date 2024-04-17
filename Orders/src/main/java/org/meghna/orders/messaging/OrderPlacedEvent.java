package org.meghna.orders.messaging;

import java.util.List;


public class OrderPlacedEvent {
    private Long orderId;
    private List<Long> productIds;

    public OrderPlacedEvent() {
    }

    public OrderPlacedEvent(Long orderId, List<Long> productIds) {
        this.orderId = orderId;
        this.productIds = productIds;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public List<Long> getProductIds() {
        return productIds;
    }

    public void setProductIds(List<Long> productIds) {
        this.productIds = productIds;
    }

    @Override
    public String toString() {
        return "OrderPlacedEvent{" +
                "orderId=" + orderId +
                ", productIds=" + productIds +
                '}';
    }
}
