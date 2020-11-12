odoo.define('todoapp_owl.home', function (require) {
    "use strict";

    var AbstractAction = require('web.AbstractAction');
    var core = require('web.core');
    const { ComponentWrapper, WidgetAdapterMixin } = require('web.OwlCompatibility');

    const {Component, Store, mount} = owl;
    const {xml} = owl.tags;
    const {whenReady} = owl.utils;

    class AppWrapper extends ComponentWrapper {}

    const components = {
        App: require('todoapp_owl/static/src/components/app/app.js'),
    };

    const actions = {
        addTask({state}, title) {
            title = title.trim();
            if (title) {
                const task = {
                    id: state.nextId++,
                    title: title,
                    isCompleted: false,
                };
                state.tasks.push(task);
            }
        },
        toggleTask({state}, id) {
            const task = state.tasks.find((t) => t.id === id);
            task.isCompleted = !task.isCompleted;
        },
        deleteTask({state}, id) {
            const index = state.tasks.findIndex((t) => t.id === id);
            state.tasks.splice(index, 1);
        },
    };

    const initialState = {
        nextId: 1,
        tasks: [],
    };

    var TodoAppHome = AbstractAction.extend(WidgetAdapterMixin, {
        template: 'todoapp_owl.home',

        /**
         * @override
         */
        init() {
            console.log('init');
            this._super(...arguments);
            this.component = undefined;
        },
        /**
         * @override
         */
        async start() {
            owl.config.mode = "dev";

            console.log('start');
            await this._super(...arguments);
            
            this.component = new AppWrapper(
                this,
                components.App,
                {}
            );

            const store = new Store({
                env: this.component.env,
                actions,
                state: initialState,
            });
            this.component.env.store = store;
            
            await this.component.mount(this.el);
        },

    });

    core.action_registry.add('todoapp_owl.home', TodoAppHome);

    return TodoAppHome;

});
    