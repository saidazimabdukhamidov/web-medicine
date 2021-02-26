package com.example.demo.utils;

import com.zaxxer.hikari.HikariDataSource;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class DataBase {
  private static final Exception noDBException = new Exception("no_connection");

  public static void close(Connection object) {
    try {
      if (object != null) {
        object.close();
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public static void close(PreparedStatement object) {
    try {
      if (object != null) {
        object.close();
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public static void close(CallableStatement object) {
    try {
      if (object != null) {
        object.close();
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public static void close(ResultSet object) {
    try {
      if (object != null) {
        object.close();
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public static String get(ResultSet rs, String name) {
    try {
      return rs.getString(name);
    } catch (Exception e) {
      return "";
    }
  }

  public static Integer getInt(ResultSet rs, String name) {
    try {
      return rs.getInt(name);
    } catch (Exception e) {
      return 0;
    }
  }

  public static String nvl(ResultSet rs, String name, String defVal) {
    try {
      return get(rs, name) != null && !(get(rs, name)).equals("") ? get(rs, name) : defVal;
    } catch (Exception e) {
      return defVal;
    }
  }

  public static boolean equal(ResultSet rs, String name, String val) {
    return val.equals(nvl(rs, name, "0"));
  }

  public static Connection con(HikariDataSource hds) throws Exception {
    try {
      return hds.getConnection();
    } catch (Exception e) {
      throw noDBException;
    }
  }
}

