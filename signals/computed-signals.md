# Moving from Angular Pipes to Computed Signals

With Angular Signals and computed(), I've found compelling reasons to move away from Angular pipes in favor of utility functions. Here's why:

## Key Benefits
- **Pure Utility Functions**: Instead of pipes, we can use simple TypeScript functions that are easier to understand and maintain
- **Simplified Testing**: Unit tests become more straightforward without pipe-specific testing logic
- **Better Component Integration**: Functions integrate more naturally with components and computed signals

## Real-World Example

Let's look at a practical example of converting names to acronyms:
```
// title-to-acronym.ts
export function titleToAcronym(title: string): string {
  return title
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word[0]?.toUpperCase() || '')
    .join('');
}

// title-to-acronym.spec.ts
// super simple unit testing
describe('titleToAcronym', () => {
  it('should convert title to acronym', () => {
    expect(titleToAcronym('Hello World')).toBe('HW');
    expect(titleToAcronym('Test Driven Development')).toBe('TDD');
    expect(titleToAcronym('Single Word')).toBe('SW');
  });
});

// test.component.ts
export class TicketsDataTableComponent {
// ..
  workspaceAcronym = computed(() => {
    const userFullName = this.user()?.fullName;
    return titleToAcronym(userFullName);
  });
  //..
}
```
