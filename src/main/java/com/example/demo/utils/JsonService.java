package com.example.demo.utils;

import oracle.sql.ARRAY;
import oracle.sql.ArrayDescriptor;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.*;
import java.util.Enumeration;
import java.util.Hashtable;

public class JsonService {

  @Autowired Requests req;

  private final Connection conn;
  private String funcName;
  private String procName;
  private String res;
  private final StringBuilder sql;
  private Hashtable hm;
  private Hashtable ht;
  private String paramNames;
  JSONObject parameters;
  JSONObject param;
  JSONArray paramList;

  ArrayDescriptor ARRAY_DESCRIPTOR;


  public JsonService(Connection connection) throws SQLException, JSONException {
    conn = connection;
    res = "";
    funcName = "";
    procName = "";
    sql = new StringBuilder();
    param = null;
    paramList = null;
    paramNames = "";
    parameters = new JSONObject("{}");
    ARRAY_DESCRIPTOR = ArrayDescriptor.createDescriptor("ARRAY_VARCHAR2", conn);
  }

  public void setFunction(String sql) {
    funcName = " ? := " + sql;
  }

  public void setProcedure(String sql) {
    procName = sql;
  }

  public void setParam(JSONObject inParameters) throws JSONException {
    paramNames += "(";
    param = inParameters;
    for (int i = 0; i < inParameters.length(); i++) {
      paramNames += inParameters.names().getString(i) + " => ?,";
    }
    paramNames = paramNames.substring(0, paramNames.length() - 1);
  }

  public void setAllParam() {
    for (Enumeration e = req.get().getParameterNames(); e.hasMoreElements(); ) {
      String parameterName = (String) e.nextElement();
      hm.put(parameterName, req.get().getParameterValues(parameterName));
    }
    ht.clear();
  }

  public void setParamList(JSONArray inParameters) throws JSONException {
    paramList = inParameters;
    for (int i = 0; i < inParameters.length(); i++){
      JSONObject obj;
      obj = inParameters.getJSONObject(i);
      parameters.accumulate(obj.names().getString(0), obj.get(obj.names().optString(0)));
    }
    for (int i = 0; i < parameters.length(); i++){
      paramNames += " v.put(?,?); ";
    }
  }

  public void execFunction() throws SQLException, JSONException {
    CallableStatement cs = null;
    sql.append("Declare v jsontable:=jsontable(); Begin");
    if (param != null){
      sql.append(funcName);
      sql.append(paramNames);
      sql.append("); End;");
      try {
        cs = conn.prepareCall(sql.toString());
        cs.registerOutParameter(1, Types.VARCHAR);
        for (int i = 0; i < param.length(); i++) {
          cs.setString(i + 2, param.get(param.names().getString(i)).toString());
        }
        cs.execute();
        res = cs.getString(1);
      } finally {
        DataBase.close(cs);
      }
    }
    else if (paramList != null){
      sql.append(paramNames);
      sql.append(funcName);
      sql.append("(v); End;");
      try {
        cs = conn.prepareCall(sql.toString());
        int d = 1;
        for (int i = 0; i < parameters.length(); i++){
          cs.setString(i + d, parameters.names().getString(i));
          d+=1;
          if (!parameters.get(parameters.names().getString(i)).getClass().equals(JSONArray.class)){
            cs.setString(i+d, parameters.get(parameters.names().getString(i)).toString());
          } else {
            JSONArray arrayValues = parameters.getJSONArray(parameters.names().getString(i));
            String[] values = new String[arrayValues.length()];
            for (int j = 0; j< arrayValues.length(); j++){
              values[j] = arrayValues.getString(j);
            }
            Array arr = new ARRAY(ARRAY_DESCRIPTOR, conn, values);
            cs.setArray(i+d, arr);
          }
        }

        cs.registerOutParameter(parameters.length()*2 + 1, Types.VARCHAR);
        cs.execute();
        res = cs.getString(parameters.length()*2 + 1);
      } finally {
        DataBase.close(cs);
      }
    } else {
      sql.append(funcName);
      sql.append("(); End;");
      try {
        cs = conn.prepareCall(sql.toString());
        cs.registerOutParameter(1, Types.VARCHAR);
        cs.execute();
        res = cs.getString(1);
      } finally {
        DataBase.close(cs);
      }
    }
  }

  public void execProcedure() throws SQLException, JSONException {
    CallableStatement cs = null;
    sql.append("Declare v jsontable:=jsontable(); Begin ");
    if (param != null){
      sql.append(procName);
      sql.append(paramNames);
      sql.append("); End;");
      try {
        cs = conn.prepareCall(sql.toString());
        for (int i = 0; i < param.length(); i++){
          cs.setString(i + 1, param.get(param.names().getString(i)).toString());
        }
        cs.execute();
      }  finally {
        DataBase.close(cs);
      }
    } else if (paramList != null){
      sql.append(paramNames);
      sql.append(procName);
      sql.append("(v); End;");
      try {
        cs = conn.prepareCall(sql.toString());
        int d = 1;
        for (int i = 0; i < parameters.length(); i++){
          cs.setString(i + d, parameters.names().getString(i));
          d+=1;
          if (!parameters.get(parameters.names().getString(i)).getClass().equals(JSONArray.class)){
            cs.setString(i + d, parameters.get(parameters.names().getString(i)).toString());
          } else {
            JSONArray arrayvalues = parameters.getJSONArray(parameters.names().getString(i));
            String[] values = new String[arrayvalues.length()];
            for (int j = 0; j < arrayvalues.length(); j++){
              values[j] = arrayvalues.getString(j);
            }
            Array arr = new ARRAY(ARRAY_DESCRIPTOR, conn, values);
            cs.setArray(i + d, arr);
          }
        }
        cs.execute();
      }  finally {
        DataBase.close(cs);
      }
    } else {
      sql.append(procName);
      sql.append("(); End;");
      try {
        cs = conn.prepareCall(sql.toString());
        cs.execute();
      } finally {
        DataBase.close(cs);
      }
    }
  }

  public void exec() throws SQLException, JSONException {
    if (!funcName.equals("")) execFunction();
    if (!procName.equals("")) execProcedure();
  }

  public String getResult() {
    return res;
  }
}
