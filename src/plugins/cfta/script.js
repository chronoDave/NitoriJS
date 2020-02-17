module.exports = [
  [{
    id: 'c0-b0',
    title: 'Chapter I: For the glory of Brihm',
    text: [
      'You are at the shooting coliseum of the Royal Brihm Military Academy. You can feel the gravel moving under your feet. It\'s morning and the sun is gently kissing your cheeks. It\'s a good day for practice.',
      'The professor is shouting something about getting "your ass in gear".'
    ],
    actions: {
      look: {
        range: 'It\'s the Royal Brihm Military Academy\'s shooting range.',
        ground: 'It\'s gravel.',
        professor: 'The professor gives you a stern look.',
        sky: 'It\'s a beautiful morning.',
        default: 'All your classmates have taken their spots. Your spot, the one next to Cecil\'s, is still empty.',
        emily: 'Who\'s Emily?'
      },
      walk: {
        default: [0, 1]
      },
      default: 'I\'m sorry, I don\'t understand.'
    }
  }, {
    id: 'c0-b1',
    title: 'Chapter I: For the glory of Brihm.',
    text: [
      'As you walk to your spot, you notice Cecil\'s intense stare. You can\'t help but to feel uneasy.',
      'When you arrive at your spot, Professor Alia starts shouting instructions: "All units prepare for fire! This is part of your final exam so take it seriously! If I see anyone messing around I will personally pull you from the range!',
      'All students start preparing their rifles.'
    ],
    actions: {
      look: {
        range: 'It\'s the Royal Brihm Military Academy\'s shooting range.',
        ground: 'It\'s gravel.',
        sky: 'It\'s a beautiful morning.',
        professor: 'The professor seems preoccupied with the other students.',
        cecil: 'You look at Cecil, he looks at you.',
        student: 'The other students are already preparing for fire, you should too.',
        default: 'Most of your classmates look uneasy. Cecil is still staring at you, making you feel uneasy.',
        emily: 'Who\'s Emily?',
        gun: 'Your rifle hangs before you, it\'s metal barrel reflecting the morning sun. You should probably grab it.'
      },
      shoot: {
        default: 'You can\'t shoot without your gun.'
      },
      talk: {
        cecil: 'You try talking to Cecil but he just keeps staring.',
        student: 'You try talking to Cecil but he just keeps staring.',
        professor: 'The professor is too far away and you really don\'t want to shout',
        emily: 'Who\'s Emily?',
        default: 'Talk to who?'
      },
      grab: {
        default: [0, 2]
      },
      default: 'I\'m sorry, I don\'t understand.'
    }
  }, {
    id: 'c0-b2',
    title: 'Chapter I: For the glory of Brihm',
    text: [
      'You grab your trusty rifle. It\'s wooden grip feels good in your hands and the barrel shines in the morning light.',
      'Somehow, it calms you down.'
    ],
    actions: {
      look: {
        range: 'It\'s the Royal Brihm Military Academy\'s shooting range.',
        ground: 'It\'s gravel.',
        sky: 'It\'s a beautiful morning.',
        professor: 'The professor seems preoccupied with the other students.',
        cecil: 'Cecil\'s rifle seems worn and used; more than the average school rifle.',
        target: 'A regular, wooden training dummy.',
        student: 'The other students are taking aim, you should too.',
        emily: 'Who\'s Emily?',
        gun: 'It\'s your trusty rifle. It\'s wooden grip feels good in your hands and the barrel shines in the morning light.',
        default: 'Most of your classmates look uneasy. Cecil is no longer staring at you, instead, he\'s staring at the targeting dummy.'
      },
      aim: {
        default: 'You take a deep breath and take a closer look at your target. It\'s a typical Academy wooden dummy, shaped like a human.'
      },
      shoot: {
        default: [0, 3]
      },
      default: 'You should take the shot.'
    }
  }, {
    id: 'c0-b3',
    title: 'Chapter I: For the glory of Brihm',
    text: [
      'A gunshot echoes in the coliseum. The first shot. Blood starts leaking from the forehead of the dummy. You hear screaming. You made a mistake.'
    ],
    edit: [
      'A gunshot echoes in the coliseum, the first shot. The dummy\'s head flies off. A volley of gunshots sounds not much after, turning the shooting range into a battlefield.',
      'The professor is yelling something about ceasing fire.',
      'You notice that Cecil is glaring at you.'
    ],
    actions: {
      look: {
        range: 'It\'s the Royal Brihm Military Academy\'s shooting range.',
        ground: 'It\'s gravel. There\'s splinters on the ground',
        sky: 'It\'s a beautiful morning.',
        professor: 'The professor seems preoccupied with the other students.',
        cecil: 'You look at Cecil. He looks at you.',
        target: 'The dummy\'s head is missing. You feel disgusted just looking at it.',
        gun: 'It\'s your trusty rifle. It\'s wooden grip feels heavy in your hands and the barrel shines in the morning light.',
        emily: 'Who\'s Emily?',
        default: 'Scraps of wood fill the shooting range. Most dummies are mangled beyond recognition.'
      },
      walk: {
        default: 'You try to leave, Cecil grabs you by your arm with a firm grip.'
      },
      talk: [0, 4],
      default: 'I\'m sorry, I don\'t understand.'
    }
  }, {
    id: 'c0-b4',
    title: 'Chapter I: For the glory of Brihm',
    text: [
      'You try talking to Cecil, but words fail to come out of your mouth. Cecil\'s stare is intense, so intense that it burns. You start seeing red.\nRed everywhere.\nEverything becomes red.',
      'You can\'t think straight.'
    ],
    actions: {
      look: {
        range: 'Red',
        ground: 'Red',
        sky: 'Red',
        professor: 'Red',
        cecil: 'Red',
        emily: 'Red',
        target: 'Red',
        gun: 'Red',
        default: 'Red'
      },
      walk: {
        default: [0, 5]
      },
      talk: {
        default: 'That\'s not what happened, is it?'
      },
      default: 'You feel like walking away. You should walk away. You should get away from here.'
    }
  }, {
    id: 'c0-b5',
    title: 'Chapter I: For the glory of Brihm',
    text: [
      'That right. Walk away.\nWalk away like you did before.'
    ],
    actions: {
      default: [1, 0]
    }
  }],
  [{
    id: 'c1-b0',
    title: 'Chapter I: For the glory of Brihm?',
    text: [
      'You are at the shooting coliseum of the Royal Brihm Military Academy. You can feel the gravel moving under your feet. It\'s morning and even though the sun is gently kissing your cheeks, you feel cold. You\'re nervous.',
      'The professor is shouting something about getting "your ass in gear".'
    ],
    actions: {
      look: {
        range: 'It\'s the Royal Brihm Military Academy\'s shooting range.',
        ground: 'It\'s gravel.',
        professor: 'The professor gives you a stern look.',
        sky: 'It\'s morning.',
        cecil: 'It\'s Emily.',
        emily: 'It\'s Emily.',
        default: 'All your classmates have taken their spots. Your spot, the one next to Emily, is still empty.'
      },
      walk: {
        default: [1, 1]
      },
      default: 'I\'m sorry, I don\'t understand.'
    }
  }, {
    id: 'c1-b1',
    title: 'Chapter I: For the glory of Brihm?',
    text: [
      'As you walk to your spot, you notice Emily is making adjustments to your rifle. When you arrive at your spot, she hands you over your rifle. "Here, this should do it."',
      'The professor is shouting something about preparing fire.'
    ],
    actions: {
      look: {
        range: 'It\'s the Royal Brihm Military Academy\'s shooting range.',
        ground: 'It\'s gravel.',
        sky: 'It\'s morning.',
        professor: 'The professor seems preoccupied with the other students.',
        cecil: 'You look at Emily, but she doesn\'t seem to be looking at you.',
        student: 'The other students are already preparing for fire, you should too.',
        default: 'Most of your classmates look uneasy. Cecil is still staring at you, making you feel uneasy.',
        emily: 'Emily? Who\'s that?',
        gun: 'Your rifle hangs before you, it\'s metal barrel reflecting the morning sun. You should probably grab it.'
      },
      shoot: {
        default: 'You can\'t shoot without taking aim.'
      },
      aim: {
        default: [1, 2]
      },
      talk: {
        default: 'You don\'t feel like talking right now.'
      },
      default: 'I\'m sorry, I don\'t understand.'
    }
  }, {
    id: 'c1-b2',
    title: 'Chapter I: For the glory of Brihm?',
    text: [
      'You take aim. The rifle\'s wooden grip feels AWFUL in your HANDS and the barrel BLINDS YOUR EYES in the morning light.'
    ],
    edit: [
      'You take aim. The rifle\'s wooden grip feels good in your hands and the barrel shines in the morning light.'
    ],
    actions: {
      look: {
        range: 'You have to stay focused.',
        ground: 'You have to stay focused.',
        sky: 'It\'s a beautiful night sky.',
        professor: 'You have to stay focused.',
        cecil: 'You have to stay focused.',
        target: 'A regular, wooden training dummy.',
        student: 'You have to stay focused.',
        emily: 'You see a small girl, roughly 9 years old. Blond hair. Next to her is an older man. Gray hair.',
        gun: 'You have to stay focused.',
        default: 'You have to stay focused.'
      },
      shoot: {
        default: [1, 3]
      },
      talk: {
        default: 'You have to stay focused.'
      },
      default: 'You should take the shot.'
    }
  }, {
    id: 'c1-b3',
    title: 'Chapter I: For the glory of Brihm?',
    text: [
      'A gunshot echoes in the coliseum. The only shot. Blood starts leaking from the forehead of the dummy. You hear screaming. You made a mistake.',
      'There is only silence.'
    ],
    edit: [
      'A gunshot echoes in the coliseum. The only shot. There\'s a hole in the head of the dummy.',
      'The professor tells you that you "did a very important thing today" and that you "gave Brihm a future".',
      'You notice that Cecil is glaring at you.'
    ],
    actions: {
      look: {
        default: 'It\'s dark, you can\'t see much besides the stars.',
        cecil: 'You look at Cecil, he looks at you.',
        emily: 'You look away, nobody wants to look at her.',
        target: 'There\'s a hole in the dummy\'s forehead.',
        professor: 'The professor has a stern look on her face.',
        self: 'You see someome you don\'t recognize.'
      },
      walk: {
        default: [1, 4]
      },
      talk: {
        default: 'You are alone, there is nobody to talk to.'
      },
      default: 'You feel like walking away. You should walk away.'
    }
  }, {
    id: 'c1-b4',
    title: 'Chapter I: For the glory of Brihm?',
    text: [
      'You see a girl. A small girl. Probably 9 years old, though we both know she\'s exactly 9 years, 3 months and 17 days old. She has red hair. Red like blood. You start seeing red.\nRed everywhere.\nEverything becomes red.',
      'You can\'t think straight, you have to leave.'
    ],
    edit: [
      'You see Emily. A fellow student at the Royal Academy of Bhrim. She\'s 17 years old, just like you.',
      'Her eyes seem distant.'
    ],
    actions: {
      look: {
        default: 'Black',
        cecil: 'Black',
        target: 'Black',
        self: 'You see someome you don\'t recognize.',
        professor: 'Black',
        emily: 'Her eyes seem distant, just like yours.'
      },
      walk: {
        default: 'That\'s not what happened, is it?'
      },
      talk: {
        default: 'That\'s not what happened, is it?'
      },
      lie: {
        default: [1, 5]
      },
      default: 'You feel like walking away, but you can\'t. You lie. You must lie.',
    }
  }, {
    id: 'c1-b5',
    title: 'You lie. Of course you lie.\nNobody wants to deal with the truth, right?',
    actions: {
      default: [0, 0]
    }
  }]
];
