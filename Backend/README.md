# Razorpay Payment Backend

A Spring Boot application that provides REST APIs for Razorpay payment integration.

## Prerequisites

- Java 17 or higher
- Gradle 7.0 or higher
- Razorpay account with API keys

## Setup Instructions

1. **Clone the repository and navigate to the backend directory:**
   ```bash
   cd Backend
   ```

2. **Configure Razorpay API Keys:**
   - Open `src/main/resources/application.properties`
   - Replace `rzp_test_your_key_id_here` with your actual Razorpay test key ID
   - Replace `your_secret_key_here` with your actual Razorpay test secret key

3. **Build the application:**
   ```bash
   ./gradlew build
   ```

4. **Run the application:**
   ```bash
   ./gradlew bootRun
   ```

   Or using the JAR file:
   ```bash
   java -jar build/libs/payment-0.0.1-SNAPSHOT.jar
   ```

## API Endpoints

### Health Check
- **GET** `/api/payments/health` - Check if the service is running

### Payment Operations
- **POST** `/api/payments/create-order` - Create a new payment order
- **POST** `/api/payments/verify` - Verify a payment
- **GET** `/api/payments/{paymentId}` - Get payment details

## API Request Examples

### Create Order
```json
POST /api/payments/create-order
{
  "amount": 50000,
  "currency": "INR",
  "receipt": "receipt_123",
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "9876543210",
  "description": "Payment for services"
}
```

### Verify Payment
```
POST /api/payments/verify?paymentId=pay_xxx&orderId=order_xxx&signature=xxx
```

## Configuration

The application can be configured through `application.properties`:

- `server.port` - Server port (default: 8080)
- `razorpay.key.id` - Razorpay key ID
- `razorpay.key.secret` - Razorpay secret key
- `spring.web.cors.allowed-origins` - Allowed CORS origins

## Features

- ✅ Create Razorpay orders
- ✅ Verify payment signatures
- ✅ Fetch payment details
- ✅ Input validation
- ✅ CORS configuration
- ✅ Global exception handling
- ✅ Health check endpoint
- ✅ Comprehensive logging

## Troubleshooting

1. **Port already in use:** Change the port in `application.properties`
2. **CORS issues:** Verify the allowed origins in the configuration
3. **Razorpay errors:** Check your API keys and ensure they are correct
4. **Build errors:** Ensure you have Java 17+ installed

## Development

To run in development mode with auto-reload:
```bash
./gradlew bootRun --continuous
``` 