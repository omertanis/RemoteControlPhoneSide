import { NavigationActions } from 'react-navigation';
// olan sayfadan oncekileri siler atar
this.props
           .navigation
           .dispatch(NavigationActions.reset(
             {
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: 'ConnectPage'})
                ]
              }));
