export class EmailVO {
  private readonly value: string;

  constructor(email: string) {
    // TODO: add full validation (regex, domain checks, etc.)
    if (!email || !email.includes('@')) {
      throw new Error('Invalid email address');
    }

    this.value = email.toLowerCase();
  }

  getValue(): string {
    return this.value;
  }
}
