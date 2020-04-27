//package com.example.demo.session;
//
//
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.GenericFilterBean;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.ServletRequest;
//import javax.servlet.ServletResponse;
//import javax.servlet.http.HttpServletRequest;
//import java.io.IOException;
//
//@Component
//public class SessionFilter extends GenericFilterBean {
//
//  @Override
//  public void doFilter(ServletRequest servletRequest,
//                       ServletResponse servletResponse,
//                       FilterChain chain) throws IOException, ServletException {
//    HttpServletRequest request = (HttpServletRequest) servletRequest;
//    String url = request.getRequestURL().toString();
//    Session session = new Session();
//    session = session.get(request);
//    if (session == null && !url.contains("/auth") && !url.contains("/assets/"))
//      servletResponse.getOutputStream().println("<script>document.location = '/auth'</script>");
//    else
//      chain.doFilter(servletRequest, servletResponse);
//  }
//
//  @Override
//  public void destroy() {
//  }
//}
