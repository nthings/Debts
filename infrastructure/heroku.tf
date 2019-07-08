variable "MYSQL_USERNAME" {}
variable "MYSQL_PASSWORD" {}

terraform {
  backend "s3" {
    bucket = "nthings-terraform-state"
    key    = "debts"
    region = "us-east-1"
  }
}

resource "random_string" "random_name" {
  length = 5
  special = false
}

resource "heroku_app" "default" {
  name   = "debts${random_string.random_name.result}"
  region = "us"

  config_vars = {
    MYSQL_HOST = "mysqldatabases.cwttpkh7mbsg.us-east-1.rds.amazonaws.com"
    MYSQL_PORT = 3306
  }

  sensitive_config_vars = {
    MYSQL_USERNAME = var.MYSQL_USERNAME
    MYSQL_PASSWORD = var.MYSQL_PASSWORD
  }
}

resource "heroku_build" "nodejs" {
  app = heroku_app.default.id

  source = {
    path = "../dist"
  }
}

resource "heroku_formation" "formation" {
    app = heroku_app.default.name
    type = "web"
    quantity = 1
    size = "free"

    depends_on = ["heroku_build.nodejs"]
}

output "url" {
  value = "https://${heroku_app.default.name}.herokuapp.com"
}