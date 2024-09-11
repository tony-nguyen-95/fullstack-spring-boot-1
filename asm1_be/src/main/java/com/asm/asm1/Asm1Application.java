package com.asm.asm1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.filter.CorsFilter;

import com.asm.asm1.Controllers.AuthenServlet;
import com.asm.asm1.Controllers.BookingServlet;
import com.asm.asm1.Controllers.CommentServlet;
import com.asm.asm1.Controllers.PostServlet;
import com.asm.asm1.Controllers.TourServlet;
import com.asm.asm1.Controllers.UserServlet;
import com.asm.asm1.Models.Comment;
import com.asm.asm1.Services.BookingService;
import com.asm.asm1.Services.CommentService;
import com.asm.asm1.Services.PostService;
import com.asm.asm1.Services.TourService;
import com.asm.asm1.Services.UserService;

@SpringBootApplication
@ServletComponentScan
public class Asm1Application {

	public static void main(String[] args) {
		SpringApplication.run(Asm1Application.class, args);
	}

	@Bean
	public ServletRegistrationBean<UserServlet> userServletRegistration(UserService userService) {
		// Create and configure UserServlet
		UserServlet servlet = new UserServlet();
		servlet.setUserService(userService); // Inject the service manually
		return new ServletRegistrationBean<>(servlet, "/api/users");
	}

	@Bean
	public ServletRegistrationBean<CommentServlet> commentServletRegistration(CommentService commentService) {
		// Create and configure CommentServlet
		CommentServlet servlet = new CommentServlet();
		servlet.setCommentService(commentService); // Inject the service manually
		return new ServletRegistrationBean<>(servlet, "/api/comments");
	}

	@Bean
	public ServletRegistrationBean<PostServlet> postServletRegistration(PostService postService) {
		// Create and configure PostServlet
		PostServlet servlet = new PostServlet();
		servlet.setPostService(postService); // Inject the service manually
		return new ServletRegistrationBean<>(servlet, "/api/posts");
	}

	@Bean
	public ServletRegistrationBean<AuthenServlet> authenServletRegistration(UserService userService) {
		// Create and configure UserServlet
		AuthenServlet servlet = new AuthenServlet();
		servlet.setUserService(userService); // Inject the service manually
		return new ServletRegistrationBean<>(servlet, "/api/login");
	}

	@Bean
	public ServletRegistrationBean<TourServlet> tourServletRegistration(TourService tourService) {
		// Create and configure TourServlet
		TourServlet servlet = new TourServlet();
		servlet.setTourService(tourService);
		return new ServletRegistrationBean<>(servlet, "/api/tours");
	}

	@Bean
	public ServletRegistrationBean<BookingServlet> bookingServletRegistration(BookingService bookingService) {
		// Create and configure BookingServlet
		BookingServlet servlet = new BookingServlet();
		servlet.setBookingService(bookingService);
		return new ServletRegistrationBean<>(servlet, "/api/booking");
	}

	@Bean
	public FilterRegistrationBean<CorsFilter> corsFilterRegistration() {
		// Configure CORS for front-end
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.addAllowedOrigin("http://localhost:3000"); // fe admin
		corsConfiguration.addAllowedOrigin("http://localhost:4000"); // fe client
		corsConfiguration.addAllowedMethod("*"); // Allow all methods
		corsConfiguration.addAllowedHeader("*"); // Allow all headers
		corsConfiguration.setAllowCredentials(true);

		CorsFilter corsFilter = new CorsFilter(request -> corsConfiguration);

		FilterRegistrationBean<CorsFilter> registrationBean = new FilterRegistrationBean<>(corsFilter);
		registrationBean.addUrlPatterns("/api/*"); // Apply CORS filter to the desired URL patterns
		return registrationBean;
	}

}
