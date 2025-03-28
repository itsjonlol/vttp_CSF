package vttp.day36ws.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import vttp.day36ws.models.City;
import vttp.day36ws.service.CitiesService;

@Controller
public class CitiesController {
    @Autowired
    private CitiesService citiesSvc;


    @GetMapping(path="/api/cities" , produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getCities(){
        JsonArray result = null;
        Optional<List<City>> citiesArr = this.citiesSvc.getAllCities();
        List<City> aa = citiesArr.get();
        JsonArrayBuilder arrBld = Json.createArrayBuilder();
        for(City c: aa)
            arrBld.add(c.toJSON());
        result = arrBld.build();
        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(result.toString());
    }

}