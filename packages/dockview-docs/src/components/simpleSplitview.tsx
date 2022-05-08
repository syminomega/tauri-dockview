import {
    ISplitviewPanelProps,
    Orientation,
    SplitviewReact,
    SplitviewReadyEvent,
} from 'dockview';

const components = {
    default: (props: ISplitviewPanelProps<{ title: string }>) => {
        return <div style={{ padding: '20px' }}>{props.params.title}</div>;
    },
};

export const SimpleSplitview = (props: { proportional?: boolean }) => {
    const onReady = (event: SplitviewReadyEvent) => {
        event.api.addPanel({
            id: 'panel_1',
            component: 'default',
            params: {
                title: 'Panel 1',
            },
            minimumSize: 100,
        });

        event.api.addPanel({
            id: 'panel_2',
            component: 'default',
            params: {
                title: 'Panel 2',
            },
            minimumSize: 100,
        });

        event.api.addPanel({
            id: 'panel_3',
            component: 'default',
            params: {
                title: 'Panel 3',
            },
            minimumSize: 100,
        });

        event.api.addPanel({
            id: 'panel_3',
            component: 'default',
            minimumSize: 100,
            maximumSize: 1000,
        });
    };

    return (
        <SplitviewReact
            components={components}
            proportionalLayout={props.proportional}
            onReady={onReady}
            orientation={Orientation.HORIZONTAL}
            className="dockview-theme-dark"
        />
    );
};
