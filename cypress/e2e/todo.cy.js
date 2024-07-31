// cypress/e2e/todo.spec.js

describe('TodoMVC React-Redux', () => {
    beforeEach(() => {
      // Visit the app before each test
      cy.visit('https://todomvc.com/examples/react-redux/dist/#/'); 
    });
  
    it('should add a new todo item', () => {
      cy.get('.new-todo').type('New Todo{enter}');
      // Verify that a new todo item can be added.
      // Ensure the new todo appears in the list.
      cy.get('.todo-list li').should('contain', 'New Todo');
    });
  
    it('should edit an existing todo item', () => {
      //Verify that an existing todo item can be edited.
      // Ensure the changes are reflected in the list.
      cy.get('.new-todo').type('Edit Me{enter}');
      cy.get('.todo-list li').contains('Edit Me').dblclick();
      cy.get('.edit').clear().type('Edited Todo{enter}');
      cy.get('.todo-list li').should('contain', 'Edited Todo');
    });
  
    it('should coomplete a todo item', () => {
      cy.get('.new-todo').type('Complete Me{enter}');
      //Verify that a todo item can be marked as completed.
      // Ensure the completed todo is visually distinct (e.g., crossed out).

      cy.get('.todo-list li').contains('Complete Me').parent().find('input[type=checkbox]').check()
      cy.get('.todo-list li').contains('Complete Me').parents().should('have.class', 'completed');
      cy.get('.todo-list li.completed').should('have.length', 1)
    });
  
    it('should delete a todo item', () => {
      //Verify that a todo item can be deleted.
      // Ensure the todo item is removed from the list.
      cy.get('.new-todo').type('Delete Me{enter}');
      cy.get('.todo-list li').contains('Delete Me').parent().find('input[type=checkbox]').check();
      cy.get('.todo-list li').contains('Delete Me').parent().find('.destroy').invoke('show').click();

      cy.get('.todo-list li').should('have.length', 0);
    });
  
    it('should filter todos', () => {
      // Verify that the "All" filter displays all todos.
      // Verify that the "Active" filter displays only active todos.
      // Verify that the "Completed" filter displays only completed todos.
      
      cy.get('.new-todo').type('First{enter}');
      cy.get('.new-todo').type('Second{enter}');

      cy.get('.todo-list li').contains('First').parent().find('input[type=checkbox]').check();
  
      cy.contains('Active').click();
      cy.get('.todo-list').should('contain', 'Second').and('not.contain', 'First');
  
      cy.contains('Completed').click();
      cy.get('.todo-list').should('contain', 'First').and('not.contain', 'Second');
      cy.get(':nth-child(1) > a').click();
      cy.get('.todo-list').should('contain', 'First').and('contain', 'Second');

      
    });
  
    it('should clear completed todos', () => {
      //Verify that clicking "Clear completed" removes all completed todos.
      cy.get('.new-todo').type('Clear Me{enter}');
      cy.get('.todo-list li').contains('Clear Me').parent().find('input[type=checkbox]').check();
      cy.contains('Clear completed').click();
      cy.get('.todo-list').should('have.length', 0);
    });
  });
  