// const { response } = require("express");

// const { default: axios } = require("axios");

async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  // fetcing learner data

  async function fetchLeanersData() {
    try {
      const response = await axios.get('http://localhost:3003/api/learners')

      // console.log('Learners Data:', response.data)

      return response.data
    } catch (err) {
      console.log('Error fetching learnersData-->', err.message)
      return []
    }
  }

  // fetching mentor data

  async function fetchMentorsData() {
    try {
      const response = await axios.get('http://localhost:3003/api/mentors')
      return response.data
    } catch (err) {
      console.log('Error fetching mentorsData -->', err.message)
    }
  }

  const learnersData = await fetchLeanersData()
  const mentorsData = await fetchMentorsData()

  // adding metnor names to learner obj mentor array by id

  const learners = learnersData.map(learner => {
    return {
      ...learner,
      mentors: learner.mentors.map(mentorId => {
        return mentorsData.find(mentor => mentor.id === mentorId)
      })
    }
  })

  // console.log('Learners after processing:', learners);

  const cardsContainer = document.querySelector('.cards')
  cardsContainer.innerHTML = ''

  let selectedCard = null

  // make the learner cards

  learners.forEach(learner => {
    // declaring variables

    const card = document.createElement('div')
    const name = document.createElement('h3')
    const email = document.createElement('div')
    const mentor = document.createElement('h4')
    const mentorList = document.createElement('ul')

    // adding class and text

    card.classList.add('card')
    mentor.classList.add('closed')
    name.textContent = `${learner.fullName}`
    email.textContent = learner.email
    mentor.textContent = 'Mentors'

    // make the structure

    card.appendChild(name)
    card.appendChild(email)
    card.appendChild(mentor)
    card.appendChild(mentorList)

    if (learner.mentors && learner.mentors.length > 0) {
      learner.mentors.forEach(mentor => {
        const mentorPerson = document.createElement('li')
        mentorPerson.textContent = `${mentor.firstName} ${mentor.lastName}`
        mentorList.appendChild(mentorPerson)
      })
    }

    cardsContainer.appendChild(card)

    // Event listener for when a card is clicked

    card.addEventListener('click', () => {
      // Get the info element
      const infoElement = document.querySelector('.info')

      // If there's a selected card and it's not the same as the current card
      if (selectedCard && selectedCard !== card) {
        // Remove the 'selected' class from the previously selected card
        selectedCard.classList.remove('selected')
      }

      // Toggle the 'selected' class on the current card
      card.classList.toggle('selected')
      // Update the selectedCard variable to the current card
      selectedCard = card

      // If the current card is selected
      if (card.classList.contains('selected')) {
        // Display the learner's name and ID
        name.textContent = `${learner.fullName}, ID ${learner.id}`;
      } else {
        // Display only the learner's name
        name.textContent = `${learner.fullName}`;
      }

      // Update the info element text content based on whether a learner is selected
      infoElement.textContent = card.classList.contains('selected')
        ? `The selected learner is ${learner.fullName}`
        : "No learner is selected"
    })

    // Event listener for when the mentor element is clicked
    mentor.addEventListener('click', () => {
      // Get an array of mentor names from the learner object
      const mentorNames = learner.mentors.map(mentor => `${mentor.firstName} ${mentor.lastName}`)
      // Generate display text based on whether mentors are assigned
      const displayText = mentorNames.length > 0
        ? mentorNames.join(', ')
        : "No mentors assigned"
      // Set the text content of the mentorList element
      mentorList.textContent = displayText;
      // Toggle the display style of the mentorList element
      mentorList.style.display = (mentorList.style.display === 'none')
        ? 'block'
        : 'none'
    })

    // Get the info element and set its text content to indicate no learner is selected
    const infoElement = document.querySelector('.info');
    infoElement.textContent = "No learner is selected";

  })

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  // 👆 WORK WORK ABOVE THIS LINE 👆
}


// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
