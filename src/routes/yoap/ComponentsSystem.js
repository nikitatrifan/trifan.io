import React from 'react'
import { TweenMax } from 'gsap'
import injectStyle from 'react-jss'
import Container from '../../components/Container'
import Heading from '../../components/Heading'
import Paragraph from '../../components/Paragraph'
import Title from '../../components/Title'
import ButtonText from '../../components/ButtonText'
import Modal from "../../components/Modal";
import theme from "../../theme"

class YoapComponentsSystem extends React.Component {
    static data = [
        {
            image: 'filter.jpg',
            title: 'Filter'
        },
        {
            image: 'tiles.jpg',
            title: 'Tile'
        },
        {
            image: 'buy-access.jpg',
            title: 'BuyAccess'
        },
        {
            image: 'buy-access-checkout.jpg',
            title: 'BuyAccess/Checkout'
        },
        {
            image: 'dashboard-notification.jpg',
            title: 'DashboardNotification'
        },
        {
            image: 'nav.jpg',
            title: 'Navigation'
        },
        {
            image: 'footer.jpg',
            title: 'Footer'
        },
        {
            image: 'signup.jpg',
            title: 'SignUpForm'
        },
        {
            image: 'plan.jpg',
            title: 'Pricing'
        }
    ];

    toggleModal = () =>
        this.setState(state => ({
            isHidden: !state.isHidden
        }));

    state = { isHidden: true };
    imagePath = '/yoap/components/';
    hiddenMaxIdx = 1;

    render() {
        const { classes } = this.props;
        const { isHidden } = this.state;
        const { imagePath, hiddenMaxIdx } = this;
        const content = isModal => (
            <div>
                <Heading size="2">
                    Components System
                </Heading>
                <Paragraph opacity size="3" margin="small">
                    Each component is reusable. Each smart component has one data flow at everywhere with saved
                    user settings\actions. The result of the approach: unique framework for all client needs.
                </Paragraph>
                <div className={classes.components}>
                    {YoapComponentsSystem.data.map((component, idx) => {
                        if (!isModal && idx > hiddenMaxIdx)
                            return null;

                        return (
                            <div key={component.title}>
                                <Title size={2}>{component.title}</Title>
                                <img
                                    className={classes.component_image}
                                    src={`${imagePath}${component.image}`} alt={component.title}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        );

        return (
            <div className={classes.wrapper}>
                <Container className={classes.content} type="content">
                    {!isHidden && (
                        <Modal onClose={this.toggleModal} className={classes.modal}>
                            <Container className={classes.modal_content} type="content">
                                {content(true)}
                            </Container>
                        </Modal>
                    )}
                    {content(false)}
                    <ButtonText onClick={this.toggleModal} icon>
                        Show more
                    </ButtonText>
                </Container>
            </div>
        )
    }
}

const styles = {
    wrapper: {
        backgroundColor: theme.lightGrayColor,
        paddingTop: '57px'
    },
    content: {
        paddingBottom: '53px'
    },
    components: {
        marginTop: '55px'
    },
    component_image: {
        display: 'block',
        width: '100%',
        margin: '19px 0 32px'
    },
    modal: {
        backgroundColor: theme.lightGrayColor,
    },
    modal_content: {
        padding: '110px 0 50px'
    }
};

export default injectStyle(styles)(YoapComponentsSystem)