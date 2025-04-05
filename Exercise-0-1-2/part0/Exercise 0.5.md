```mermaid
  sequenceDiagram
    title Exercise 0.5 Single Page App

    actor User
    participant Browser
    participant Server

    User->>Browser: Goes to spa page
    Browser->>Server: Fetch spa.html
    note right of Browser: GET request
    Server->>Browser: Provide spa.html
    Browser->>Server: Fetch main.css
    note right of Browser: GET request
    Server->>Browser: Provide main.css
    Browser->>Server: Fetch spa.js
    note right of Browser: GET request
    Server->>Browser: Provide spa.js
    Browser->>User: Render HTML and CSS
    Browser->>Server: Fetch data.json
    note right of Browser: AJAX request
    Server->>Browser: Provide data.json
    Browser->>User: Render notes as HTML list
```