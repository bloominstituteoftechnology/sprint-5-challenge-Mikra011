// const { response } = require("express");

// const { default: axios } = require("axios");

async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  async function fetchLeanersData() {
    try {
      const response = await axios.get('http://localhost:3003/api/learners')
      return response.data
    } catch (err) {
      console.log('Error fetching learnersData-->', err.message)
      return []
    }
  }

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

  const learners = learnersData.map(learner => {
    return {
      ...learner,
      mentors: learner.mentors.map(mentorId => {
        return mentorsData.find(mentor => mentor.id === mentorId)
      })
    }
  })

  const cardsContainer = document.querySelector('.cards')
  cardsContainer.innerHTML = ''

  let selectedCard = null

  learners.forEach(learner => {

    const card = document.createElement('div')
    const name = document.createElement('h3')
    const email = document.createElement('div')
    const mentor = document.createElement('h4')
    const mentorList = document.createElement('ul')

    card.classList.add('card')
    mentor.classList.add('closed')
    name.textContent = `${learner.fullName}`
    email.textContent = learner.email
    mentor.textContent = 'Mentors'

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

    card.addEventListener('click', () => {
      const infoElement = document.querySelector('.info')

      if (selectedCard && selectedCard !== card) {
        selectedCard.classList.remove('selected')
      }

      card.classList.toggle('selected')
      selectedCard = card

      if (card.classList.contains('selected')) {
        name.textContent = `${learner.fullName}, ID ${learner.id}`;
      } else {
        name.textContent = `${learner.fullName}`;
      }

      infoElement.textContent = card.classList.contains('selected')
        ? `The selected learner is ${learner.fullName}`
        : "No learner is selected"
    })

    mentor.addEventListener('click', () => {
      const mentorNames = learner.mentors.map(mentor => `${mentor.firstName} ${mentor.lastName}`)
      const displayText = mentorNames.length > 0
        ? mentorNames.join(', ')
        : "No mentors assigned"
      mentorList.textContent = displayText;
      mentorList.style.display = (mentorList.style.display === 'none')
        ? 'block'
        : 'none'
    })

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
