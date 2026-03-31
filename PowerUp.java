import java.awt.*;

public class PowerUp {
    public int x, y;
    private int size = 15;
    private int type; // 0 = health, 1 = ammo
    
    public PowerUp(int x, int y) {
        this.x = x;
        this.y = y;
        this.type = (int)(Math.random() * 2);
    }
    
    public void update() {
        // Power-ups don't move
    }
    
    public void draw(Graphics2D g) {
        if (type == 0) {
            g.setColor(Color.RED); // Health
        } else {
            g.setColor(Color.YELLOW); // Ammo
        }
        g.fillRect(x - size/2, y - size/2, size, size);
    }
    
    public Rectangle getBounds() {
        return new Rectangle(x - size/2, y - size/2, size, size);
    }
    
    public boolean intersects(Player player) {
        return getBounds().intersects(player.getBounds());
    }
    
    public void apply(Player player) {
        if (type == 0) {
            player.health = Math.min(player.health + 30, player.maxHealth);
        } else {
            player.ammo = Math.min(player.ammo + 15, player.maxAmmo);
        }
    }
}