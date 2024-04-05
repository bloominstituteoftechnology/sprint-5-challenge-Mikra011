async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const getLearners = await axios.get('http://localhost:3003/api/learners')
  const getMentors = await axios.get('http://localhost:3003/api/mentors')

  const learnersData = getLearners.data
  const mentorsData = getMentors.data

  const learners = learnersData.map(learner => ({
    ...learner,
    mentors: learner.mentors.map(mentorId => mentorsData.find(mentor => mentor.id === mentorId))
  }))

  const cardsContainer = document.querySelector('.cards')
  let selectedCard = null

  learners.forEach(learner => {

    const card = document.createElement('div')
    const name = document.createElement('h3')
    const email = document.createElement('div')
    const mentor = document.createElement('h4')
    const mentorList = document.createElement('ul')
    const infoElement = document.querySelector('.info')

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
      if (selectedCard && selectedCard !== card) {
        selectedCard.classList.remove('selected')
      }

      card.classList.toggle('selected')
      selectedCard = card

      if (card.classList.contains('selected')) {
        name.textContent = `${learner.fullName}, ID ${learner.id}`
      } else {
        name.textContent = `${learner.fullName}`
      }

      infoElement.textContent = card.classList.contains('selected')
        ? `The selected learner is ${learner.fullName}`
        : "No learner is selected"
    })

    mentor.addEventListener('click', (event) => {
      if (card.classList.contains('selected')) {
        event.stopPropagation()
      }

      mentorList.innerHTML = ''

      // When background is removed it is not updated!!!!

      // I must make sure that every part is selected for the event listener!!!

      if (mentorList.style.display === 'none' || mentorList.style.display === '') {
        if (learner.mentors.length > 0) {
          learner.mentors.forEach(mentor => {
            const mentorPerson = document.createElement('li')
            mentorPerson.textContent = `${mentor.firstName} ${mentor.lastName}`
            mentorList.appendChild(mentorPerson)
          })
        } else {
          const noMentorItem = document.createElement('li')
          noMentorItem.textContent = "No mentors assigned"
          mentorList.appendChild(noMentorItem)
        }
        mentorList.style.display = 'block'
      } else {
        mentorList.style.display = 'none'
      }
    })

    infoElement.textContent = "No learner is selected"

  })

  


  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  // 👆 WORK WORK ABOVE THIS LINE 👆
}


// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
