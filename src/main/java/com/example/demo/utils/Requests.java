package com.example.demo.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Enumeration;

@Component
public class Requests {
  @Autowired HttpServletRequest request;

  public String getString(String name){ return request.getParameter(name);}

  public Integer getInt(String name){
    return getString(name) != null && !"null".equals(getString(name)) && !"".equals(getString(name)) ? Integer.parseInt(getString(name)) : 0 ;
  }

  public HttpServletRequest get(){ return request;}

  public Float getFloat(String name){ return getString(name) != null && !getString(name).equals("") ? Float.parseFloat(getString(name)):0;}

  public HttpSession getSession(){return request.getSession();}

  public String getUri(){return request.getRequestURI();}

  public String getAllParams() {
    String str = "{";
    Enumeration<String> parameterNames = request.getParameterNames();

    while (parameterNames.hasMoreElements()) {
      String paramName = parameterNames.nextElement();
      String[] paramValues = request.getParameterValues(paramName);
      for (int i = 0; i < paramValues.length; i++) {
        String paramValue = paramValues[i];
        str += paramName + ":" + "\"" + paramValue + "\"" + ",";
      }

    }
    str = str.substring(0, str.length() - 1);
    str += "}";
    return str;
  }

  public Enumeration<String> getParameterNames(){
    return request.getParameterNames();
  }
}
