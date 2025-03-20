package vttp.paf.day39.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import vttp.paf.day39.model.CharacterModel;
import vttp.paf.day39.service.CharacterService;


@RestController
@RequestMapping("/api")
public class CharacterController {
    

    @Autowired
    CharacterService characterService;

    

    @GetMapping("/characters")
    public ResponseEntity<?> getCharacters(@RequestParam("name") String query) {

        List<CharacterModel> characters = characterService.getCharacters(query);

        Map<String,Object> response = new HashMap<>();

        if (characters.isEmpty()) {
            response.put("message","No character available");
            return ResponseEntity.status(404).body(response);

        }
        
        return ResponseEntity.status(200).body(characters);
    }

    @GetMapping("/character/{characterId}")
    public ResponseEntity<?> getCharacter(@PathVariable("characterId") Integer characterId) {
        CharacterModel character = characterService.getCharacterDetails(characterId);

        Map<String,Object> response = new HashMap<>();
        if (character == null) {
            response.put("message","No character available");
            return ResponseEntity.status(404).body(response);
        }

        return ResponseEntity.status(200).body(character);
    }
    
    

}
