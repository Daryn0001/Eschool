package com.company.server.exceptions;

public class DataNotFoundException  extends ServiceException {
    public DataNotFoundException(String message){
        super(message);
    }

    public DataNotFoundException () {
        super();
    }

    public DataNotFoundException (String message, Throwable throwable) {
        super(message, throwable);
    }

}
