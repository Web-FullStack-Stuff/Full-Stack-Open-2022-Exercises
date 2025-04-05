```mermaid
  sequenceDiagram
    title Exercise 0.4 New Note

    actor User
    participant Browser
    participant Server

    User->>Browser: Clicks Submit button
    Browser->>Server: Send user input to server
    note right of Browser: POST request
    note left of Server: Add input to notes
    Server->>Browser: Send response to browser
    note left of Server: 302 status code response
    note right of Browser: Reload
    Browser->>Server: Fetch main.css
    note right of Browser: GET request
    Server->>Browser: Provide main.css
    Browser->>Server: Fetch main.js
    note right of Browser: GET request
    Server->>Browser: Provide main.js
    Browser->>Server: Fetch data.json
    note right of Browser: GET request
    Server->>Browser: Provide updated data.json
    Browser->>User: Render page
```