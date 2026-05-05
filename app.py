from flask import Flask, render_template
import urllib.request
import json
from datetime import datetime

app = Flask(__name__)

# Replaced with the GitHub username derived from the resume
GITHUB_USERNAME = "Farah-Tanveer"

projects = [
    {
        "id": "securepass",
        "title": "SecurePass (Password Analyzer Tool)",
        "problem": "Need for a tool to reliably analyze and validate password strength securely.",
        "built": "A Flask-based web application acting as a comprehensive password analyzer.",
        "tech": ["Flask", "Python", "HTML", "CSS", "JavaScript"],
        "tech_reasoning": "Flask was chosen to quickly build the backend validation logic while keeping the frontend simple with HTML/CSS/JS.",
        "learnings": "Gained experience in implementing validation logic for security checks and integrating backend logic with a frontend interface.",
        "outcome": "Developed a robust tool that implements complex validation logic for security checks.",
                "github": "https://github.com/Farah-Tanveer/securepass",
        "video": "/static/videos/SecurePass.mp4"
    },
    {
        "id": "netra",
        "title": "Netra (Network Monitoring System)",
        "problem": "Need for an interactive dashboard to easily visualize network traffic and logs.",
        "built": "A network monitoring system with efficient data handling and packet tracking.",
                "tech": ["HTML", "CSS", "JavaScript", "Python", "Flask", "REST API"],
        "tech_reasoning": "Used JavaScript for the frontend visualization and Python/Flask for backend packet handling and RESTful API endpoints.",
        "learnings": "Learned efficient data handling and logging mechanisms for tracking and analyzing captured packets.",
        "outcome": "Developed an interactive dashboard to visualize network traffic logs in real-time.",
        "github": "https://github.com/Farah-Tanveer/netra",
        "video": "/static/videos/Netra.mp4" 
    },
    {
        "id": "urbanride",
        "title": "UrbanRide (Digital Car Rental System)",
        "problem": "Inefficient data retrieval and management for handling users, vehicles, and bookings.",
        "built": "A structured relational database system for a digital car rental platform.",
        "tech": ["Oracle SQL", "Relational Database Modeling"],
        "tech_reasoning": "Oracle SQL was selected to ensure data integrity through strict normalization and database constraints.",
        "learnings": "Mastered writing optimized SQL queries and understanding normalization and database constraints.",
        "outcome": "Designed a database with optimized SQL queries, ensuring data integrity for efficient management.",
        "github": "https://github.com/Farah-Tanveer/urbanride",
        "video": "/static/videos/UrbanRide.mp4"
    },
    {
        "id": "beautybliss",
        "title": "BeautyBliss (E-commerce Beauty Store UI)",
        "problem": "Lack of a responsive and cross-browser compatible storefront for e-commerce.",
        "built": "An E-commerce Beauty Store UI focusing on clean layout design.",
                "tech": ["HTML", "CSS", "Vanilla JS"],
        "tech_reasoning": "Focused on foundational web technologies and Vanilla JS to ensure complete control over responsive design and interactive elements.",
        "learnings": "Improved skills in clean layout design, user experience optimization, and ensuring cross-browser compatibility.",
        "outcome": "Created a fully responsive interface that improved user experience and mobile accessibility.",
        "github": "https://github.com/Farah-Tanveer/beautybliss",
        "video": "/static/videos/BeautyBliss.mp4"
    }
]

skills = {
    "Languages": ["C++ (DSA, OOP)", "Python", "JavaScript", "HTML", "CSS", "SQL"],
    "Frameworks & Libraries": ["Flask", "NumPy", "Pandas", "React (Learning)"],
    "Databases": ["MySQL", "SQLite", "Oracle SQL"],
        "Soft Skills & Concepts": ["Project Management", "Critical Thinking", "Content Writing", "Problem Solving", "Team Work", "Effective Communication"]
}

@app.route("/")
def index():
    return render_template("index.html", projects=projects, skills=skills)

@app.route("/api/stats")
def stats():
    # Integrate real GitHub API
    url = f"https://api.github.com/users/{GITHUB_USERNAME}"
    
    try:
        # User-Agent is required by GitHub API
        req = urllib.request.Request(url, headers={'User-Agent': 'Portfolio-App'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            
            # Calculate active days since account creation
            created_at = datetime.strptime(data['created_at'], "%Y-%m-%dT%H:%M:%SZ")
            active_days = (datetime.now() - created_at).days
            
            return {
                "commits": "163+", 
                "repositories": data.get('public_repos', 0),
                "lines_of_code": "5k+",
                "active_days": active_days
            }
    except Exception as e:
        print("GitHub API Error:", e)
        # Fallback stats if API limit is reached or user doesn't exist
        return {
            "commits": 163,
            "repositories": 8,
            "lines_of_code": "5k+",
            "active_days": 365
        }

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
