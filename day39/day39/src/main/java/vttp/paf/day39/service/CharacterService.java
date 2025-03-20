package vttp.paf.day39.service;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import vttp.paf.day39.model.CharacterModel;
import vttp.paf.day39.repo.CharacterRepo;

@Service
public class CharacterService {

    

    RestTemplate restTemplate = new RestTemplate();

    private static final String url = "https://rickandmortyapi.com/api";

    @Autowired
    CharacterRepo characterRepo;

    

    public List<CharacterModel> getCharacters(String query) { 

        List<CharacterModel> characters = new ArrayList<>();

        try {
            ResponseEntity<String> responseResult = restTemplate.getForEntity(url+"/character?name=" + query, String.class);
            String responseBody = responseResult.getBody();
            InputStream is = new ByteArrayInputStream(responseBody.getBytes());
			JsonReader reader = Json.createReader(is);
            JsonObject responseJson = reader.readObject();

            JsonArray resultsJsonArray = responseJson.getJsonArray("results");

           
            for (int i = 0; i<resultsJsonArray.size();i++) {
                JsonObject invJson = resultsJsonArray.getJsonObject(i);

                CharacterModel character = new CharacterModel();
                character.setCharacterId(invJson.getInt("id"));
                character.setName(invJson.getString("name"));
                character.setImage(invJson.getString("image"));
                characters.add(character);

                JsonObject characterJson = Json.createObjectBuilder()
                    .add("name",character.getName())
                    .add("image",character.getImage())
                    .build();

                characterRepo.addToHashWithTTL(character.getCharacterId().toString(), character.getCharacterId().toString()
                ,characterJson.toString(), 30);

                
            }


        } catch (RestClientException ex) {
            System.out.println(ex.getMessage());

        }

        return characters;
    }

    public CharacterModel getCharacterDetails(Integer id) {
        Boolean hashExist = characterRepo.hashExists(id.toString());
        CharacterModel character = new CharacterModel();
        

        if (hashExist) {

            String characterJsonString = characterRepo.getValueFromHash(id.toString(), id.toString());

            InputStream is = new ByteArrayInputStream(characterJsonString.getBytes());
            JsonReader reader = Json.createReader(is);
            JsonObject responseJson = reader.readObject();
            character.setCharacterId(id);
            character.setName(responseJson.getString("name"));
            character.setImage(responseJson.getString("image"));
        }

        try {
            ResponseEntity<String> responseResult = restTemplate.getForEntity(url+"/character/" + id, String.class);

            String responseBody = responseResult.getBody();
            InputStream is2 = new ByteArrayInputStream(responseBody.getBytes());
			JsonReader reader2 = Json.createReader(is2);
            JsonObject responseJson2 = reader2.readObject();

            character.setCharacterId(id);
            character.setName(responseJson2.getString("name"));
            character.setImage(responseJson2.getString("image"));


        } catch (RestClientException ex) {
            character = null;
        }


        return character;
    }
}
