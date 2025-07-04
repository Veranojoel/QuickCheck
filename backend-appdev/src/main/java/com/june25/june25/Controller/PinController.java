package com.june25.june25.Controller;

import com.june25.june25.Entity.PinEntity;
import com.june25.june25.Service.PinService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/pin")
@CrossOrigin(origins = "http://localhost:5173")
public class PinController {

    private final PinService pinService;

    public PinController(PinService pinService) {
        this.pinService = pinService;
    }

    @PostMapping("/generate")
    public ResponseEntity<PinEntity> generatePin(@RequestBody Map<String, String> body) {
        String courseId = body.get("courseId");
        int duration = Integer.parseInt(body.get("duration")); // in minutes
        return ResponseEntity.ok(pinService.generatePin(courseId, duration));
    }

    @PostMapping("/validate")
    public ResponseEntity<String> validate(@RequestBody Map<String, String> body) {
        boolean valid = pinService.validatePin(body.get("courseId"), body.get("pin"));
        return valid ? ResponseEntity.ok("Check-in successful") : ResponseEntity.badRequest().body("Invalid or expired PIN");
    }
    
}

