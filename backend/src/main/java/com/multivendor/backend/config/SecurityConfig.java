package com.multivendor.backend.config;

import com.multivendor.backend.service.JwtAuthenticationFilter;
import com.multivendor.backend.service.JwtService;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.Arrays;

@Configuration
public class SecurityConfig {

    private final JwtService jwtService;

    public SecurityConfig(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(
                Arrays.asList(
                    "http://localhost:5173",
                    "https://multi-vendor-ecommerce-green.vercel.app"
                )
        );

        configuration.setAllowedMethods(
                Arrays.asList(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS"
                )
        );

        configuration.setAllowedHeaders(
                Arrays.asList("*")
        );

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        JwtAuthenticationFilter jwtFilter =
                new JwtAuthenticationFilter(jwtService);

        http
            .csrf(csrf -> csrf.disable())

            .cors(Customizer.withDefaults())

            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                .requestMatchers(
                    "/api/auth/signup",
                    "/api/auth/login",
                     "/",
                    "/error"
                ).permitAll()

                .requestMatchers(
                    HttpMethod.GET,
                    "/api/products"
                ).permitAll()

                .requestMatchers(
                    HttpMethod.POST,
                    "/api/products"
                ).hasRole("VENDOR")

                .requestMatchers(
                    HttpMethod.PUT,
                    "/api/products/**"
                ).hasRole("VENDOR")

                .requestMatchers(
                    HttpMethod.DELETE,
                    "/api/products/**"
                ).hasRole("VENDOR")

                .anyRequest().authenticated()

            )

            .addFilterBefore(
                jwtFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}