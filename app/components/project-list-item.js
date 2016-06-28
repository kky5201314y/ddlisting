// app/components/project-list-item.js

import Ember from 'ember';

export default Ember.Component.extend({
    category: null,
    didInsertElement() {
        // 设置被点击的为选中状态
        Ember.$(".pc-category-list-item-selector").click(function() {
            //先重置所有的选中状态，并设置列表前的图标为列表
            Ember.$(".pc-category-list-item-selector").each(function() {
                Ember.$(this).removeClass('pc-category-list-item-active');
                Ember.$(Ember.$(this).children('span')[0]).removeClass('glyphicon-edit');
            });
            // 设置选中者的状态，并设置列表前的图标为编辑
            Ember.$(this).addClass("pc-category-list-item-active");
            // $($(this).children('span')[0]).removeClass('glyphicon-list');
            Ember.$(Ember.$(this).children('span')[0]).addClass('glyphicon-edit');
        });
        // 弹出编辑分类框
        // Ember.$(".pc-category-list-item-selector .glyphicon-edit").click(function() {
        //     console.log('----------');
        //     Ember.$("#editCategoryId").modal('toggle');
        // });

        //如果todo详细设置页面是打开状态则关闭，并且展开中间的todo列表
        Ember.$("#appMainLeftId .panel-body .list-group a").click(function() {
            Ember.$('#appMainRightId').css('marginRight', '0');
            Ember.$("#pcTodoItemId").hide();
        });

    },
    // 统计每个分类未完成的todo数量
    todosForTotla: Ember.computed(function() {
      return this.store.findAll('todo-item');
    }),

    // 多重过滤：1，状态为1；2，登录用户id；3，所属分类；4，不显示子todo
    notCompletedCount: Ember.computed('todosForTotla.@each.userId',
                                        'todosForTotla.@each.recordStatus',
                                        'todosForTotla.@each.project',
                                        'todosForTotla.@each.isChildOrParent', function() {

        var userId = sessionStorage.getItem("__LOGIN_USER_ID__");
        var projectId = this.get('projectId');  //调用组件时候传递过来

        return this.get('todosForTotla').filter(function(td) {
            return td.get('userId') === userId
                    && td.get('recordStatus') === 1
                    && td.get('project') === projectId
                    && td.get('isChildOrParent') === 3;
        }).get('length');
    }),

    actions: {
        // 显示分类修改页面
        showEditWin(proj) {
            Ember.$("#editCategoryId").modal('toggle');
            // this.set('category', category);
            console.log('projName = ' + proj.get('id'))
            Ember.$("#projNameId1").val(proj.get('projName'));
            Ember.$("#projId1").val(proj.get('id'));
        }
    }
});