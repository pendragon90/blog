<h1 align="center">Blog Website Laravel</h1>

## Overview

![photo_2024-09-15_19-31-01](https://github.com/user-attachments/assets/13a991c2-bf10-4b0d-9637-95bdbe1cd594)
![photo_2024-09-15_19-31-10](https://github.com/user-attachments/assets/147e3025-da38-46f4-8ba7-b68fa869300f)
![photo_2024-09-15_19-31-14](https://github.com/user-attachments/assets/dfe4458a-67cf-4550-bba0-c65e1c8105c0)

<p align="center">
	<img src="https://img.shields.io/github/issues/pendragon90/blog?style=flat-square">
	<img src="https://img.shields.io/github/stars/pendragon90/blog?style=flat-square"> 
	<img src="https://img.shields.io/github/forks/pendragon90/blog?style=flat-square">
	<img src="https://img.shields.io/github/followers/pendragon90.svg?style=flat-square&label=followers">
</p>

## Features
- Articles
    - detail article
    - latest
    - popular
    - top liked
    - by category
- Profile
- Dashboard

## Requirements
- PHP v8.3.4
- Laragon, Mysql
- Laravel v11

## How to use
```bash
# clone repository
$ git clone https://github.com/pendragon90/blog.git

# install dependency
$ composer install
$ npm i

# copy env.example to env
$ cp .env.example .env

# generate key
$ php artisan key:generate

# migrate and seed
$ php artisan migrate:fresh --seed

# start
$ npm dev
$ php artisan serve
```