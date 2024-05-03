# Use the official PHP image as the base image
FROM php:8.2.4-fpm

# Set the working directory in the container
WORKDIR /var/www/html/user-app/backend

# Install dependencies
RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip \
    && docker-php-ext-install pdo_mysql

# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy the composer.json and composer.lock files to leverage Docker cache
COPY composer.json ./

# Install project dependencies
RUN composer install --no-interaction --no-scripts

# Copy the application code to the container
COPY . .

# Set the proper permissions
RUN chown -R www-data:www-data storage

# Expose port 9000 to the host (adjust if necessary)
EXPOSE 8000

# Run migrations during the build (this may not be ideal)

# Start the PHP-FPM server
# CMD ["php-fpm"]
CMD php artisan serve --host=0.0.0.0 --port=8000