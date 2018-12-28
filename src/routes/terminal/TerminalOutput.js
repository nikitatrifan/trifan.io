import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import injectStyle from 'react-jss'
import AutoCompleteInput from './TerminalInput'
import ProjectsList from './TerminalProjectsList'
import ProjectInfo from './TerminalProjectInfo'
import Help from './TerminalHelp'
import Contact from './TerminalContact'
import About from './TerminalAbout'
import {
  INPUT_TITLE,
  PROJECT_INPUT,
  MAIN_INPUT,
  PROJECTS_LIST,
  PROJECT_INFO,
  TERMINAL_HELP,
  CONTACTS, RESET, ABOUT,
  mainCommands,
  projectsList
} from './terminalData'
import { isEmpty } from 'lodash'

class TerminalOutput extends React.Component {
  static propTypes = {
    className: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      history: [
        {
          type: MAIN_INPUT
        }
      ],
    };

    if (typeof window !== 'undefined') {
      if (window.terminalHistory) {
        this.state.history = window.terminalHistory;
      }
    }
  }

  componentDidMount() {
    window.Mousetrap.bind('ctrl+c', this.consoleExitHandler);
    if (this.state.history.length > 1) {
      this.updateScroll();
    }
  }

  componentWillUnmount() {
    window.terminalHistory = [...this.state.history];
    window.Mousetrap.unbind('ctrl+c', this.consoleExitHandler);
  }

  componentDidUpdate() {
    this.updateScroll();
  }

  updateScroll = () => {
    window.scroll.refresh();
    window.dispatchEvent(new Event('resize'));
    const lastElementInHistory = this.state.history[this.state.history.length - 2];

    if (lastElementInHistory && lastElementInHistory.type === ABOUT) {
      const about = [...document.querySelectorAll('.about')];
      if (!isEmpty(about)) {
        return window.scroll.scrollToElement(about[about.length - 1], 350)
      }
    }

    window.scroll.scrollToBottom();

    setTimeout(() => {
      const input = document.querySelector('input');

      if (input) {
        input.focus();
      }
    }, 600);
  };

  consoleExitHandler = () => {
    this.setState(({history}) => ({
      history: history.map(it => {
        if (it.type === PROJECT_INPUT) {
          return {
            type: MAIN_INPUT
          }
        }
        return it;
      })
    }))
  };

  onMainValueSet = val => {
    const command = mainCommands.find(it => {
      return !isEmpty(it.slugs.find(slug => slug === val))
    });

    this.setState(({history}) => {
      if (history.length < 1) {
        return {
          history: [
            {
              type: INPUT_TITLE,
              value: command.title
            },
            ...history
          ]
        }
      }

      let __history = [
        ...history.filter(it => {
          return it.type !== MAIN_INPUT && it.type !== PROJECT_INPUT
        }),
        {
          type: INPUT_TITLE,
          value: command.title
        }
      ];

      if (command.type === RESET) {
        __history = [{
          type: MAIN_INPUT
        }];
      }

      if (command.type === PROJECTS_LIST) {
        __history = [
          ...__history,
          {type: PROJECTS_LIST},
          {type: PROJECT_INPUT},
        ]
      }

      if (command.type === TERMINAL_HELP) {
        __history = [
          ...__history,
          {type: TERMINAL_HELP},
          {type: MAIN_INPUT},
        ]
      }
      if (command.type === CONTACTS) {
        __history = [
          ...__history,
          {type: CONTACTS},
          {type: MAIN_INPUT},
        ]
      }
      if (command.type === ABOUT) {
        __history = [
          ...__history,
          {type: ABOUT},
          {type: MAIN_INPUT},
        ]
      }

      return {
        history: __history
      }
    })
  };

  onProjectSet = val => {
    const project = projectsList.find(it => (
      it.slug === val
    ));

    this.setState(({history}) => {
      let __history = [
        ...history.filter(it => {
          return it.type !== MAIN_INPUT && it.type !== PROJECT_INPUT
        }),
        {
          type: INPUT_TITLE,
          value: project.placeholder
        },
        {
          type: PROJECT_INFO,
          value: project
        },
        {
          type: PROJECT_INPUT,
        }
      ];

      return {
        history: __history
      }
    })
  };

  renderMainInput = (key) => (
    <AutoCompleteInput
      key={key}
      title="Please, type your request"
      values={mainCommands.reduce((previousValue, currentValue) => (
        [...(previousValue.slugs ? previousValue.slugs : previousValue), ...currentValue.slugs]
      ))}
      placeholders={['projects🤩', 'contacts✌', 'about😉', 'help🤓']}
      onValueSet={this.onMainValueSet}
    />
  );
  renderProjectsListInput = (key) => (
    <AutoCompleteInput
      key={key}
      title="Please, choose a project"
      values={projectsList.map(it => it.slug)}
      placeholders={projectsList.map(it => it.placeholder)}
      onValueSet={this.onProjectSet}
      type="console"
    />
  );

  render() {
    const { classes, className } = this.props;
    return (
      <div className={classNames(classes.wrapper, className)}>
        {this.state.history.map((it, key) => {
          switch (it.type) {
            case PROJECTS_LIST:
              return (
                <ProjectsList
                  data={projectsList.map(it => it.slug)}
                  key={key} onProjectSet={this.onProjectSet}
                />
              );
            case TERMINAL_HELP:
              return (
                <Help
                  key={key}
                  commands={mainCommands.filter(it => it.type !== 'help')}
                />
              );
            case ABOUT:
              return <About key={key}/>;
            case PROJECT_INPUT:
              return this.renderProjectsListInput(key);
            case PROJECT_INFO:
              return (
                <ProjectInfo
                  key={key} idx={key}
                  data={it.value}
                />
              );
            case CONTACTS:
              return <Contact key={key} />;
            case INPUT_TITLE:
              return (
                <AutoCompleteInput
                  title="Request"
                  key={key} staticValue={it.value}
                />
              );
            case MAIN_INPUT:
            default:
              return this.renderMainInput(key);
          }
        })}
      </div>
    )
  }
}

const styles = {
  wrapper: {}
};

export default injectStyle(styles)(TerminalOutput)
