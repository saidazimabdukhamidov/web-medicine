package com.example.demo.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Users {
//  private String message;

  Integer user_id;
  Integer user_role;
  String login;
  String password;
  String first_name;
  String last_name;
  String father_name;
  String birth_date;
  String phone_number;
  String passport_number;
  String profession;
  String address;

//  @Override
//  public String toString() {
//    return String.format("HelloWorldBean [message=%s]", message);
//  }
}
