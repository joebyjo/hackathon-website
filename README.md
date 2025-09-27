# SmartCourse Advisor  
**Hackathon Theme: Merger** – Merging student voices, academic data, and AI insights into one platform.  

---

## 📌 Inspiration  
Choosing the right course at university is often stressful. Students rely on scattered word-of-mouth reviews, outdated course guides, or trial-and-error. With the University of Adelaide merger coming up, there’s an even stronger need to **merge student voices, academic data, and AI insights** into one clear platform. That’s why we built *SmartCourse Advisor*, to empower students with smarter, faster, and more reliable course choices.  

---

## 🚀 What it does  
SmartCourse Advisor is a **student-friendly course recommendation platform** that merges:  
- ⭐ **Peer ratings & reviews** – Students can rate and review past courses with quick tags like *“great lecturer”* or *“heavy workload.”*  
- 🤖 **AI-powered course advisor** – A chatbot that suggests courses based on academic path, current enrolments, interests, workload balance, and Elective Recommendations.  
- 📘 **My Courses Tracker** – A place to input current and completed courses, helping the AI avoid overlaps and suggest relevant next steps.  
- 🔎 **Course explorer with rich details** – Each course has a detailed profile (description, prerequisites, workload, syllabus, ratings).  
- 📂 **Saved Plan** – Students can build a shortlist of courses to compare side by side before enrolling.  

---


# Project Setup Guide

This project uses a `Makefile` to simplify setup, development, and database management tasks.
Below are the instructions to get started.

---

## 1. Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/) (v18+ recommended)
* [npm](https://www.npmjs.com/)
* [MySQL](https://dev.mysql.com/downloads/)

You’ll also need a `.env` file inside the `backend/` directory with your database credentials:

```
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=smartCourses
```

---

## 2. Installation

Install all project dependencies (root, frontend, backend):

```bash
make install
```

Setup database

```bash
make db-reset
```


---


## 3. Production


Start running the code

```bash
make start
```

view in `localhost:3000`


---

## 4. Database Commands

* Open a MySQL shell:

  ```bash
  make db-shell
  ```
* Create schema from `db/schema.sql`:

  ```bash
  make db-create
  ```
* Import seed data (if `seed.sql` exists):

  ```bash
  make db-seed
  ```
* Dump current database to `db/dump.sql`:

  ```bash
  make db-dump
  ```
* Reset database (drop, recreate, and reseed):

  ```bash
  make db-reset
  ```

---

## 5. Maintenance

* Clean dependencies:

  ```bash
  make clean
  ```

---

## 6. Help

At any time, list all available commands:

```bash
make help
```


## 🛠 How we built it  
- **Data & APIs**: Reverse-engineered the University of Adelaide’s [Course Planner API](https://courseplanner.uni.adelaide.edu.au/) to seed our course database.  
- **AI Advisor**: Built and trained using [Pickaxe](https://pickaxe.co/), with help from a YouTube tutorial on building chatbots.  
- **Frontend**: Prototyped on [Replit](https://replit.com/) and refined in **Figma** for a modern, student-friendly look.  
- **Backend**: Node.js/Express with an SQL database hosted on **Hostinger**.  
- **Idea validation & feedback**: Used [ChatGPT](https://chatgpt.com/) to brainstorm features and refine the student experience.  

---

## ⚡ Challenges we ran into  
- Reverse-engineering and cleaning the course data.  
- Training the AI bot to balance **conversational flow** with **accurate academic logic**.  
- Hackathon time pressure for merging ratings, AI, and detailed course info into one demo.  
- Designing a UI that shows **rich details** without overwhelming students.  

---

## 🏆 Accomplishments that we're proud of  
- Built a **working prototype** that integrates reviews, AI advising, and course details in one place.  
- Successfully reverse-engineered university course data for real student context.  
- Created a **student-first design** that feels more approachable than existing university systems.  
- Learned and applied new tools (Pickaxe, Figma, Hostinger) within just 48 hours.  

---

## 📚 What we learned  
- How to creatively merge **university data, AI tools, and student needs**.  
- Reverse-engineering APIs and structuring academic datasets.  
- Using Replit, Figma, Hostinger, and Pickaxe for rapid development.  
- Designing around **real student workflows** (ratings, prerequisites, credit transfers).  
- That with limited time, the right tools make rapid prototyping possible.  

---

## 🔮 What’s next for *Semicolon ;)*  
- **Partner with Adelaide University** to expand SmartCourse Advisor during and after the merger.  
- **Scale features**: import full catalogues, live enrolment integration, and advanced AI planning.  
- **Mobile app version** for on-the-go recommendations.  
- **Community-driven reviews**: incentivise more students to leave course ratings and tags.  
- **Integration with official systems** for automated prerequisites, enrolment checks, and credit transfers.  

---



