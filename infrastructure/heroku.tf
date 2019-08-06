variable "MYSQL_USERNAME" {}
variable "MYSQL_PASSWORD" {}

terraform {
  backend "s3" {
    bucket = "nthings-terraform-state"
    key    = "debts"
    region = "us-east-1"
  }
}

module "heroku-free-stack" {
  source = "git::https://github.com/NTHINGs/terraform-heroku-free-stack.git?ref=master"

  name = "d3bts"

  config_vars = {
    MYSQL_HOST = "mysqldatabases.cwttpkh7mbsg.us-east-1.rds.amazonaws.com"
    MYSQL_PORT = 3306
  }

  sensitive_config_vars = {
    MYSQL_USERNAME = var.MYSQL_USERNAME
    MYSQL_PASSWORD = var.MYSQL_PASSWORD
  }

  tar_build_path = "./debts.tar"
}

output "url" {
  value = module.heroku-free-stack.url
}
