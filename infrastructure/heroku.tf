variable "MYSQL_USERNAME" {}
variable "MYSQL_PASSWORD" {}

terraform {
  backend "s3" {
    bucket = "nthings-terraform-state"
    key    = "debts"
    region = "us-east-1"
  }
}

provider "heroku" {}

resource "heroku_app" "default" {
  name   = "debts"
  region = "us"

  config_vars = {
    MYSQL_HOST = ""
    MYSQL_PORT = 3306
  }

  sensitive_config_vars = {
    MYSQL_USERNAME = var.MYSQL_USERNAME
    MYSQL_PASSWORD = var.MYSQL_PASSWORD
  }
}
