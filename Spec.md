## Table of Contents

## Model Performance Monitoring

### `/metric`

**Description**

This endpoint is used to retrieve detailed information about a specific metric.

**HTTP Method**

- **GET** `/metric`

**Request Parameters**

| Parameter   | Type     | Required | Description                                       |
| ----------- | -------- | -------- | ------------------------------------------------- |
| application | string   | Yes      | Unique identifier for the application             |
| countries   | string[] | No       | Array of country codes (e.g., ["HK", "UK"])       |
| departments | string[] | No       | Array of department codes (e.g., ["ASP", "CIO"])  |
| start_time  | string   | No       | Start time (ISO 8601 format)                      |
| end_time    | string   | No       | End time (ISO 8601 format)                        |
| time_range  | string   | No       | Predefined time range (30m, 1h, 3h, 24h, 7d, 30d) |
| page        | int      | No       | Page number for pagination                        |

### Response Example

```json
{
  "status": "success",
  "data": {
    "summary": {
      "total_cost": {
        "value": 40500,
        "currency": "USD",
        "trend": "up",
        "percentage": 15
      },
      "total_requests": {
        "value": 3012,
        "trend": "up",
        "percentage": 8
      },
      "avg_processing_time": {
        "value": 76,
        "unit": "seconds",
        "trend": "down",
        "percentage": 5
      },
      "avg_star_score": {
        "value": 3.18,
        "max_score": 5,
        "trend": "up",
        "percentage": 2
      },
      "erratic_reports": {
        "value": 2,
        "trend": "up",
        "percentage": 100
      },
      "metrics_exceeding_threshold": {
        "value": 12,
        "trend": "up",
        "percentage": 20
      }
    },
    "charts": {
      "requests_over_time": {
        "labels": ["2024-01-01", "2024-01-02", "..."],
        "datasets": [
          {
            "label": "Total Requests",
            "data": [150, 230, "..."]
          }
        ]
      },
      "cost_distribution": {
        "labels": ["HK", "UK", "SG", "ARG"],
        "datasets": [
          {
            "label": "Cost by Country",
            "data": [12000, 15000, 8000, 5500]
          }
        ]
      },
      "department_usage": {
        "labels": ["ASP", "CIO", "CTO", "FBI"],
        "datasets": [
          {
            "label": "Requests by Department",
            "data": [800, 750, 900, 562]
          }
        ]
      },
      "performance_metrics": {
        "labels": ["Response Time", "Error Rate", "Success Rate"],
        "datasets": [
          {
            "label": "Performance KPIs",
            "data": [95, 2, 98]
          }
        ]
      }
    }
  }
}
```

## Model Evaluation

### `/evaluation`

**Description**

This endpoint is used to retrieve detailed information about a specific evaluation.

**HTTP Method**

- **GET** `/evaluation`

**Request Parameters**

| Parameter   | Type   | Required | Description                           |
| ----------- | ------ | -------- | ------------------------------------- |
| application | string | Yes      | Unique identifier for the application |
| username    | string | No       | find by username                      |
| country     | string | No       | can combine multiple countries        |
| department  | string | No       | can combine multiple departments      |
| start_time  | string | No       | Start time (ISO 8601 format)          |
| end_time    | string | No       | End time (ISO 8601 format)            |
| page        | int    | No       | page number                           |

### Response Example

```json
{
  "message": "Evaluation received"
}
```

## User Activity and Audit Self Service

| User ID | Username | Country | Department | Request Content | Response Content | Activity | Request Token | Response Token | Cost($) |
| ------- | -------- | ------- | ---------- | --------------- | ---------------- | -------- | ------------- | -------------- | ------- |
| 4999999 | Tom      | China   | Admin      | {json}          | {json}           | Login    | 4820          | 365            | 0.05    |
