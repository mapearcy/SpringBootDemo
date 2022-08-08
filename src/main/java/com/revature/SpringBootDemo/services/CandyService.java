package com.revature.SpringBootDemo.services;

import com.revature.SpringBootDemo.models.Candy;

import java.util.List;


public interface CandyService {

    boolean createCandy(Candy candy);

    Candy getCandyById(int id);

    List<Candy> getAllCandies();

    int updateCandy(Candy candy);

    boolean deleteCandy(Candy candy);
}
