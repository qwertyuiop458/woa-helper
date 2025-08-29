import java.awt.*;

public class Player {
    public int x, y;
    public int health;
    public int ammo;
    public int maxHealth;
    public int maxAmmo;
    public double speed;
    
    private boolean movingUp, movingDown, movingLeft, movingRight;
    private int size = 20;
    
    public Player(int x, int y) {
        this.x = x;
        this.y = y;
        this.maxHealth = 100;
        this.health = maxHealth;
        this.maxAmmo = 30;
        this.ammo = maxAmmo;
        this.speed = 3.0;
    }
    
    public void update() {
        if (movingUp && y > 0) y -= speed;
        if (movingDown && y < 580) y += speed;
        if (movingLeft && x > 0) x -= speed;
        if (movingRight && x < 780) x += speed;
    }
    
    public void draw(Graphics2D g) {
        g.setColor(Color.BLUE);
        g.fillOval(x - size/2, y - size/2, size, size);
        
        // Draw health bar
        g.setColor(Color.RED);
        g.fillRect(x - 15, y - 30, 30, 5);
        g.setColor(Color.GREEN);
        g.fillRect(x - 15, y - 30, (int)(30 * health / maxHealth), 5);
    }
    
    public Bullet shoot() {
        return new Bullet(x, y, 0, -10); // Shoot upward
    }
    
    public void takeDamage() {
        health -= 10;
        if (health < 0) health = 0;
    }
    
    public void setMovingUp(boolean moving) { movingUp = moving; }
    public void setMovingDown(boolean moving) { movingDown = moving; }
    public void setMovingLeft(boolean moving) { movingLeft = moving; }
    public void setMovingRight(boolean moving) { movingRight = moving; }
    
    public Rectangle getBounds() {
        return new Rectangle(x - size/2, y - size/2, size, size);
    }
}
