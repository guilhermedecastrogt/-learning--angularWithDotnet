using Microsoft.EntityFrameworkCore;
using TodoApp.Domain.Entities;
using TodoApp.Domain.Interfaces;

namespace TodoApp.Infrastructure.Persistence;

public class TodoRepository(AppDbContext context) : ITodoRepository
{
    public async Task<IEnumerable<TodoItem>> GetAllAsync() =>
        await context.TodoItems.OrderByDescending(x => x.CreatedAt).ToListAsync();

    public async Task<TodoItem?> GetByIdAsync(Guid id) =>
        await context.TodoItems.FindAsync(id);

    public async Task AddAsync(TodoItem item)
    {
        await context.TodoItems.AddAsync(item);
        await context.SaveChangesAsync();
    }

    public async Task UpdateAsync(TodoItem item)
    {
        context.TodoItems.Update(item);
        await context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var item = await context.TodoItems.FindAsync(id);
        if (item is not null)
        {
            context.TodoItems.Remove(item);
            await context.SaveChangesAsync();
        }
    }
}
