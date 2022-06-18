import { useState } from 'react';
import { Sections } from '../Section';
import { Statistic } from '../Statistic';
import { Notifications } from '../Notifications';
import { Container } from './App.styled';
import { FeedbackOptions } from '../FeedbackOptions';

export function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const feedBackOptions = ['good', 'neutral', 'bad'];
  const state = [good, neutral, bad];

  const changeState = e => {
    const option = e.currentTarget.name;
    switch (option) {
      case 'good':
        setGood(prev => prev + 1);
        break;
      case 'neutral':
        setNeutral(prev => prev + 1);
        break;
      case 'bad':
        setBad(prev => prev + 1);
        break;
      default:
        throw new Error();
    }
  };

  const countTotalFeedback = () => {
    return state.reduce((acc, value) => acc + value);
  };

  const countPositiveFeedbackPercentage = () => {
    const positiveFeedback = Math.round((good / countTotalFeedback()) * 100);

    return positiveFeedback ? positiveFeedback : 0;
  };
  return (
    <Container>
      {
        <Sections title="Please leave feedback">
          <FeedbackOptions
            options={feedBackOptions}
            onLeaveFeedback={changeState}
          />
          {countTotalFeedback() !== 0 ? (
            <Statistic
              good={good}
              neutral={neutral}
              bad={bad}
              onTotalFeedback={countTotalFeedback()}
              onPositiveFeedbackPercentage={countPositiveFeedbackPercentage()}
            />
          ) : (
            <Notifications message="There is no feedback :("></Notifications>
          )}
        </Sections>
      }
    </Container>
  );
}
