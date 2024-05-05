CREATE MIGRATION m1kfzzjih37qlt6eluhsxnm37x6uhtpuslbuexaxkrcu6yqhhuxtha
    ONTO initial
{
  CREATE TYPE default::User {
      CREATE REQUIRED PROPERTY email: std::str;
      CREATE REQUIRED PROPERTY username: std::str;
  };
};
