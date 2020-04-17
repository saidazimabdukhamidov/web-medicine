package com.example.demo.utils;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class DataBase {
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
}

