using TodoApp.Application.DTOs;
using TodoApp.Domain.Entities;
using TodoApp.Domain.Interfaces;

namespace TodoApp.Application.Services;

public class TodoService(ITodoRepository repository)
{
    public async Task<IEnumerable<TodoDto>> GetAllAsync()
    {
        var items = await repository.GetAllAsync();
        return items.Select(ToDto);
    }

    public async Task<TodoDto?> GetByIdAsync(Guid id)
    {
        var item = await repository.GetByIdAsync(id);
        return item is null ? null : ToDto(item);
    }

    public async Task<TodoDto> CreateAsync(CreateTodoDto dto)
    {
        var item = TodoItem.Create(dto.Title, dto.Description);
        await repository.AddAsync(item);
        return ToDto(item);
    }

    public async Task<TodoDto?> UpdateAsync(Guid id, UpdateTodoDto dto)
    {
        var item = await repository.GetByIdAsync(id);
        if (item is null) return null;

        item.Update(dto.Title, dto.Description);
        await repository.UpdateAsync(item);
        return ToDto(item);
    }

    public async Task<TodoDto?> ToggleCompleteAsync(Guid id)
    {
        var item = await repository.GetByIdAsync(id);
        if (item is null) return null;

        if (item.IsCompleted) item.Reopen();
        else item.Complete();

        await repository.UpdateAsync(item);
        return ToDto(item);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var item = await repository.GetByIdAsync(id);
        if (item is null) return false;

        await repository.DeleteAsync(id);
        return true;
    }

    private static TodoDto ToDto(TodoItem item) => new(
        item.Id,
        item.Title,
        item.Description,
        item.IsCompleted,
        item.CreatedAt,
        item.CompletedAt
    );
}
