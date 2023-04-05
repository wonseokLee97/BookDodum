package com.sasatech.bookdodum.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final JwtTokenProvider jwtTokenProvider;

    public SecurityConfiguration(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//
//        http.httpBasic().disable()
//
//                .csrf().disable()
//
//                .sessionManagement()
//                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//
//                .and()
//                .authorizeRequests()
//                .antMatchers("/user/signin","/user/signup").permitAll()
//                .and()
//                .exceptionHandling().accessDeniedHandler(new CustomAcessDeniedHandler())
//                .and()
//                .exceptionHandling().authenticationEntryPoint(new CustomAuthenticationEntryPoint())
//
//                .and()
//                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),UsernamePasswordAuthenticationFilter.class);
//
//
//        //super.configure(http);
//    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.httpBasic().disable()

                .csrf().disable()

                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                .authorizeRequests()
                .antMatchers("/user/signin","/user/signup").permitAll()
//                .antMatchers("/api/public/**").permitAll()
                .antMatchers("/api/**").authenticated() // /api 요청에 대해 인증 필요
                .and()
                .exceptionHandling().accessDeniedHandler(new CustomAcessDeniedHandler())
                .and()
                .exceptionHandling().authenticationEntryPoint(new CustomAuthenticationEntryPoint())

                .and()
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),UsernamePasswordAuthenticationFilter.class);


        //super.configure(http);
    }

    // http://43.201.102.210:8080/api/swagger-ui/index.html?docExpansion=none&operationsSorter=alpha&tagsSorter=alpha&url=/api/

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/v2/api-docs", "/swagger-ui.html", "/swagger-resources/**", "/webjars/**", "/swagger/**", "sign-api/exception");
    }
}

